const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'https://bailey44.pythonanywhere.com'
).replace(/\/$/, '');

const ACCESS_TOKEN_KEY = 'becoming_mom_access_token';
const REFRESH_TOKEN_KEY = 'becoming_mom_refresh_token';

export const tokenStorage = {
  getAccessToken: () =>
    localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () =>
    localStorage.getItem(REFRESH_TOKEN_KEY),

  setTokens: ({ access, refresh }) => {
    if (access) {
      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        access,
      );
    }

    if (refresh) {
      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        refresh,
      );
    }
  },

  clear: () => {
    localStorage.removeItem(
      ACCESS_TOKEN_KEY,
    );

    localStorage.removeItem(
      REFRESH_TOKEN_KEY,
    );
  },
};

export class ApiError extends Error {
  constructor(
    message,
    status,
    data,
  ) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const parseResponse = async (
  response,
) => {
  if (
    response.status === 204
  ) {
    return null;
  }

  return response
    .json()
    .catch(() => null);
};

const request = async (
  path,
  {
    method,
    body,
    auth,
  },
) => {
  const headers = {
    Accept: 'application/json',
  };

  const isFormData =
    body instanceof FormData;

  if (
    body !== undefined &&
    !isFormData
  ) {
    headers['Content-Type'] =
      'application/json';
  }

  if (auth) {
    const accessToken =
      tokenStorage.getAccessToken();

    if (accessToken) {
      headers.Authorization =
        `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(
                body,
              ),
    },
  );

  const data =
    await parseResponse(
      response,
    );

  return {
    response,
    data,
  };
};

export const apiRequest =
  async (
    path,
    {
      method = 'GET',
      body,
      auth = false,
      retry = true,
    } = {},
  ) => {
    let {
      response,
      data,
    } = await request(
      path,
      {
        method,
        body,
        auth,
      },
    );

    /*
     * access token 만료 시
     * refresh token으로 재발급
     */
    if (
      auth &&
      retry &&
      response.status === 401 &&
      tokenStorage.getRefreshToken()
    ) {
      const refreshResult =
        await request(
          '/api/accounts/token/refresh/',
          {
            method: 'POST',
            body: {
              refresh:
                tokenStorage.getRefreshToken(),
            },
            auth: false,
          },
        );

      if (
        refreshResult.response.ok &&
        refreshResult.data?.access
      ) {
        /*
         * 새 access token 저장
         */
        tokenStorage.setTokens(
          refreshResult.data,
        );

        /*
         * 원래 요청 재시도
         */
        ({
          response,
          data,
        } = await request(
          path,
          {
            method,
            body,
            auth,
          },
        ));
      } else {
        /*
         * refresh도 실패
         */
        tokenStorage.clear();
      }
    }

    /*
     * API 오류
     */
    if (!response.ok) {
      const fieldMessage =
        data &&
        typeof data ===
          'object'
          ? Object.values(
              data,
            )
              .flat()
              .find(
                (value) =>
                  typeof value ===
                  'string',
              )
          : null;

      const message =
        data?.detail ||
        data?.message ||
        data?.error ||
        fieldMessage ||
        '요청을 처리하지 못했습니다.';

      throw new ApiError(
        message,
        response.status,
        data,
      );
    }

    return data;
  };