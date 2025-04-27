const KEY = "4c6317e3641c450fa61154553251003";
const url = new URL("http://api.weatherapi.com/v1");
url.searchParams.set("key", KEY)

export const searchWeather = async ({location, enpoint, method})=>{
    url.pathname += enpoint;
    url.searchParams.set("q", location)
    const response = await fetch(url.toString(),{method});
    if (response.status == 400) {alert("Esta opción no es valida" ); return {status: 400}};
    const data = await response.json();
    const {name, region, country} = data.location
    url.pathname = "/v1";
    const {forecast} = await findForecastByDay(
        {
            name,
            region,
            country,
            enpoint: "/forecast.json",
            method: "get"
        }
    )
    const {forecastday} = forecast;
    data.status = 200;
    data.forecast = forecastday
    return data;
}

export const findForecastByDay = async({name, region, country, enpoint, method})=>{
    url.pathname += enpoint
    url.searchParams.set("q", name);
    url.searchParams.set("region", region);
    url.searchParams.set("country", country);
    const response = await fetch(url.toString(), {method});
    const data = await response.json();
    return data
}