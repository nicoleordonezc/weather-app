import { searchWeather } from "./findApi.js";

addEventListener("scroll", (e)=>{
    console.log(window.scrollY);
    const header = document.querySelector("header");
    const navbar = document.querySelector("#navbar");
    const input = document.querySelector(".div__icon input");
    const imgIcon = document.querySelector(".div__icon img");
    const h1 = document.querySelector(".div__title h1");
    const spanTitle = document.querySelector(".div__title span");
    const img = document.querySelector(".div__image img");
    const span = document.querySelector(".div__image span");
    const div__footer = document.querySelector("#div__footer");

    if (window.scrollY > 20) {
        navbar.style.height = "250px";
        header.style.height = "220px";
        navbar.style.backgroundImage = "none"; 
        navbar.style.backgroundColor = "var(--card-1)";
        navbar.style.borderRadius = "0px"; 
        navbar.style.justifyContent = "flex-start"; 
        navbar.style.gap = "15px"; 
        input.style.color = "var(--color-2)";
        imgIcon.src = "storage/img/search_black.png"
        h1.style.fontSize = "57px";
        h1.style.color = "var(--color-2)";
        h1.style.letterSpacing = "0px";
        spanTitle.style.color = "var(--color-2)";
        img.style.width = "77.5px";
        img.style.height = "77.5px";
        span.style.display = "none";
        div__footer.style.display = "none";
    } else {
        navbar.removeAttribute("style");
        header.removeAttribute("style");
        input.removeAttribute("style");
        imgIcon.src = "storage/img/search_white.png"
        div.removeAttribute("style");
        h1.removeAttribute("style");
        spanTitle.removeAttribute("style");
    
        img.removeAttribute("style");
        span.removeAttribute("style");
        div__footer.removeAttribute("style");
    }
})

const search =document.querySelector("#search");
const temp_c =document.querySelector("#temp_c");
const icon =document.querySelector("#icon");
const status =document.querySelector("#status");
const last_updated =document.querySelector("#last_updated");
const feelslike_c =document.querySelector("#feelslike_c");
const maxtemp_c =document.querySelector("#maxtemp_c");
const mintemp_c = document.querySelector("#mintemp_c")

search.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const url = new URL(e.target.action);
    data.enpoint = url.pathname;
    data.method = e.target.method;
    const response = await searchWeather(data);
    if (response.status == 400){return undefined};
    temp_c.textContent = `${response.current.temp_c}º`;
    icon.src = response.current.condition.icon;
    status.textContent = response.current.condition.text;
    feelslike_c.textContent = `Feels like ${response.current.feelslike_c}º`;
    maxtemp_c.textContent = `Day ${response.forecast[0].day.maxtemp_c}º`;
    mintemp_c.textContent = `night ${response.forecast[0].day.mintemp_c}º`;

    const fecha = new Date(response.current.last_updated).toLocaleString("en-US",{
        month: "long",
        day: "numeric",
        hour: "2-digit",
       });

    last_updated.textContent = fecha;
    
})


const ctx = document.getElementById('tempChart').getContext('2d');
    
// Crear el degradado para el fondo
const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
gradientFill.addColorStop(0, 'rgba(43, 0, 165, 0.25)'); // Color más claro arriba
gradientFill.addColorStop(1, 'rgba(43, 0, 165, 0)');   // Transparente abajo

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        data: [-7, -1, -2, -1, 3, -1, -2], // Datos de ejemplo
        fill: 'start',  // Rellena siempre hacia abajo de la línea
        borderColor: '#000000', // Color de la línea
        backgroundColor: gradientFill,  // Degradado aplicado al fondo
        pointBackgroundColor: '#21005D', // Color del fondo del punto
        pointBorderColor: '#fff', // Color del borde del punto
        pointBorderWidth: [0,0,0,0,4,0,0], // Ancho del borde del punto
        pointRadius: [0, 0, 0, 0, 10, 0,  0], // Tamaño de los puntos
        pointHoverRadius: [0, 1, 0, 0, 9, 0, 0], // Tamaño del punto al pasar el ratón
        pointStyle: 'circle', // Estilo del punto
    }]
};

const options = {
    responsive: true, // Ajustar la escala de la gráfica a la ventana
    plugins: {
        legend: {
            display: false // Ocultar la leyenda
        },
        tooltip: {
            enabled: true, // Habilitar la herramienta de información emergente
            yAlign: "bottom", // Alinear el texto del cuadro de información
            callbacks: {
                title: () => '', // Función de formato del título de la leyenda
                label: (context) => `${context.raw}°`, // Función de formato de los marcadores de la leyenda
            },
            backgroundColor: '#ffffff', // Color de fondo de la leyenda
            titleFont: { size: 0 }, // Tamaño del título de la leyenda
            bodyFont: { size: 14 }, // Tamaño del texto de la leyenda
            bodyColor: '#000', // Color del texto de la leyenda
            displayColors: false, // Mostrar el color de la leyenda
            padding: 8 // Espacio entre el texto y el borde de la leyenda
        }
    },
    scales: {
        x: {
            grid: { display: false }, // Ocultar la línea de la escala
            ticks: { color: '#000' } // Color de los marcadores de la escala
        },
        y: {
            beginAtZero: false, // Iniciar la escala en cero
            min: -10, // Límite inferior de la escala
            max: 10, // Límite superior de la escala
            ticks: {
                stepSize: 10, // Tamaño de los marcadores de la escala
                color: '#000',// Color de los marcadores de la escala
                callback: value => `${value}°` // Función de formato de los marcadores de la escala
            }
        }
    },
    elements: {
        line: {
            tension: 0.4  // Ajusta la suavidad de la curva
        }
    }
};

const tempChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});