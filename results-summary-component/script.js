const resultContainer = document.getElementById('result-container');

const colorArray = {
    "Reaction": ["hsl(0, 100%, 67%)", 30],
    "Memory": ["hsl(39, 100%, 56%)", 41],
    "Verbal": ["hsl(166, 100%, 37%)", 60],
    "Visual": ["hsl(234, 85%, 45%)", 52]
};

const changeLightness = (delta, hslStr) => {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

    const newLightness = Math.max(
        0,
        Math.min(100, lightness + parseFloat(delta))
    );

    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};

async function getData() {
    const res = await fetch('./data.json');
    const data = await res.json();

    data.forEach((val) => {
        const resultPill = document.createElement('div');
        resultPill.className = "result-pill";
        resultPill.style.backgroundColor = changeLightness(colorArray[val.category][1], colorArray[val.category][0]);

        const imgContainer = document.createElement('div');
        imgContainer.className = "img-container";

        const img = document.createElement('img');
        img.src = val.icon;
        img.style.fontWeight='800';
        img.alt=val.category;

        const span = document.createElement('span');
        span.style.color = colorArray[val.category][0];
        let title = document.createTextNode(val.category);
        span.appendChild(title);

        imgContainer.appendChild(img);
        imgContainer.appendChild(span);

        // /*  */
        var mainSpan = document.createElement("span");
        mainSpan.className = "bold";
        var textNode1 = document.createTextNode(val.score + " ");

        var nestedSpan = document.createElement("span");
        nestedSpan.className = "gray-color";

        var textNode2 = document.createTextNode("/ 100");

        mainSpan.appendChild(textNode1);
        nestedSpan.appendChild(textNode2);
        mainSpan.appendChild(nestedSpan);

        resultPill.appendChild(imgContainer);
        resultPill.appendChild(mainSpan);
        resultContainer.appendChild(resultPill);
        /*  */
    });
}
getData();