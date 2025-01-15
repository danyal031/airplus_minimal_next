export async function fetchData(
  path: string,
  method: string,
  data: any = null,
  cache: RequestCache = "force-cache",
  token: string | null = null
) {
  const headers: HeadersInit = {
    Domain: "localhost",
    // Domain: window.location.hostname,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return await fetch(process.env.NEXT_PUBLIC_BASE_URL_2 + path, {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : null,
    cache: cache,
  })
    .then((res) => {
      // console.log("res:", res);

      return res.json();
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
}

export const getAirportsInServer = async () => {
  return await fetchData(
    "/base/data?" +
      new URLSearchParams({
        action: "airports",
        route: "1",
      }).toString(),
    "GET",
    null,
    "force-cache"
  )
    .then((response) => {
      // console.log("response airports:", response.data.titles);
      return response.data.titles;
    })
    .catch((error) => {});
};
