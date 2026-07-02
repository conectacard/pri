const LORENA_DATA = { titulo: "PRI ES EDUCACION" };

const CONFIG = { 
    whatsapp: "524491472336", 
    youtube: "https://www.youtube.com/watch?v=pjbyce2eR0Q", 
    facebook: "https://www.facebook.com/pepe.moreno.9235", 
    sitioWeb: "https://pri.org.mx/ElPartidoDeMexico/", 
    mapa: "https://pri-aguascalientes.org/", 
    allowedExt: ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'] 
};

const JUEGOS_DATA = [
    { nombre: "GATO", link: "https://gato-pri.surge.sh/", img: "GATO" },
    { nombre: "MEMORAMA", link: "http://memorama-pri.surge.sh/", img: "MEMORAMA" },
    { nombre: "ASOCIACIÓN", link: "https://asocia-pri.surge.sh/", img: "ASOCIA" },
    { nombre: "ROMPECABEZAS", link: "https://rompecabezas-pri.surge.sh/", img: "ROMPECABEZAS" }
];

const VIDEOS_DATA = [
    { nombre: "TABLAS", link: "https://fantastic-belekoy-cecbb9.netlify.app/", img: "TABLAS DE MULTIPLICAR" },
    { nombre: "AGUA", link: "https://www.youtube.com/watch?v=XnNZtIsFuEw", img: "AGUA" },
    { nombre: "INGLÉS", link: "https://iframe.mediadelivery.net/play/423537/66bc7e7a-0fea-4a65-b0dc-09fdd99439a0", img: "INGLES" },
    { nombre: "FESTIVOS", link: "https://warm-cocada-270990.netlify.app/", img: "DIAS FESTIVOS" }
];

const OTROS_DATA = [
    { nombre: "IA PRESENTACIÓN", link: "https://drive.google.com/file/d/1AQbeIUWh2tig9JYp56jZwchLKEuA0uvw/view?usp=sharing", img: "INTELIGENCIAS ARTIFICIALES" },
    { nombre: "RADIO VALORES", link: "https://vocaroo.com/1t0OqK3Qgkoo", img: "VALORES" },
    { nombre: "DINOSAURIOS", link: "https://drive.google.com/file/d/1IEvRqCCDH961DtwKxPM8IQBMgzs4wSFF/view", img: "DINOSAURIOS" },
    { nombre: "ARTE PLANEACIÓN", link: "https://drive.google.com/file/d/1WtcpRg3xFpdZoIHV7CeEpuTq4v1nDImx/view?usp=sharing", img: "ARTE" }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lorena-title').textContent = LORENA_DATA.titulo;
    document.getElementById('link-yt').href = CONFIG.youtube;
    document.getElementById('link-web').href = CONFIG.sitioWeb;
    document.getElementById('link-wa').href = `https://wa.me/${CONFIG.whatsapp}`;
    
    if(document.getElementById('link-wa-direct')) {
        document.getElementById('link-wa-direct').href = `https://wa.me/${CONFIG.whatsapp}`;
    }

    const qrImg = document.getElementById('qr-code-img');
    if(qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(CONFIG.mapa)}`;
    }

    renderInteractiveGrid('grid-fotos-cliente', JUEGOS_DATA);
    renderInteractiveGrid('grid-reconocimientos', VIDEOS_DATA);
    renderInteractiveGrid('grid-clientes-fotos', OTROS_DATA);
});

function tryLoadAnyExt(baseName, callback) {
    let extIdx = 0;
    const tryNext = () => {
        if (extIdx >= CONFIG.allowedExt.length) {
            callback('assets/imagenes/logo.png');
            return;
        }
        const path = `assets/imagenes/${baseName}${CONFIG.allowedExt[extIdx]}`;
        const img = new Image();
        img.onload = () => callback(path);
        img.onerror = () => { extIdx++; tryNext(); };
        img.src = path;
    };
    tryNext();
}

function renderInteractiveGrid(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    dataArray.forEach(item => {
        const div = document.createElement('div');
        div.className = 'premium-photo-item';
        const imgElement = document.createElement('img');
        tryLoadAnyExt(item.img, (src) => { imgElement.src = src; });
        div.appendChild(imgElement);
        div.onclick = () => { playClick(); window.open(item.link, '_blank'); };
        container.appendChild(div);
    });
}

function showAppContent(type) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const target = document.getElementById(type + '-pane');
    if(target) target.style.display = 'flex';
}

function closeAppContent() { playClick(); document.getElementById('dynamic-content-layer').style.display = 'none'; }
function openMarketing() { playClick(); document.getElementById('marketing-modal').style.display = 'flex'; }
function closeMarketing() { document.getElementById('marketing-modal').style.display = 'none'; }

function playClick() { 
    const snd = document.getElementById('sndFxClick'); 
    if (snd) { snd.currentTime = 0; snd.play().catch(()=>{}); } 
}

async function shareExperienceRobust() { 
    playClick(); 
    try { await navigator.share({title: 'CONCURSO IA | ID-CARD', url: window.location.href}); } 
    catch(e) { 
        navigator.clipboard.writeText(window.location.href);
        alert("¡Enlace copiado!"); 
    } 
}