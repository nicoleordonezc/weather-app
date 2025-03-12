const KEY = "4c6317e3641c450fa61154553251003";
const url = new URL("http://api.weatherapi.com/v1");
url.searchParams.set("key", KEY)

export const searchWeather = async ({location, enpoint, method})=>{
    url.pathname += enpoint;
    url.searchParams.set("q", location)
    const response = await fetch(url.toString(),{method});
    if (response.status == 400) {alert("Esta opción no es valida" ); return {status: 400}};

    const data = await response.json();
    data.status = 200;
    url.pathname = "/v1";
    return data;
}