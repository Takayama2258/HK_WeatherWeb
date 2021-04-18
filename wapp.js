
window.onload = function(){
    titleBlock()
    headerBlock();
    fetchData().then(myDataBlock).then(nineDayBlock);
}

function titleBlock(){
    var body = document.querySelector('body');
    var title_block = document.createElement("div");
    title_block.setAttribute("id", "title");
    title_block.innerHTML="My Weather Portal";
    body.appendChild(title_block);
}

function headerBlock(){
    var body = document.querySelector('body');
    // implement header block
    var header_block = document.createElement("header");
    var header_h = document.createElement("div");
    header_h.innerHTML = "Hong Kong";
    header_h.setAttribute("class", "body_title");

    var header_div = document.createElement("div");
    var weather = document.createElement("div");
    var temperature = document.createElement("div");
    var humidity = document.createElement("div");
    var rainfall = document.createElement("div");
    var uv = document.createElement("div");
    header_div.setAttribute("id", "header_div");
    weather.setAttribute("id", "weather");
    temperature.setAttribute("id", "temperature");
    humidity.setAttribute("id", "humidity");
    rainfall.setAttribute("id", "rainfall");
    uv.setAttribute("id", "uv");

    let weather_img = document.createElement("img");
    var humidity_img = document.createElement("img");
    var rainfall_img = document.createElement("img");
    var uv_img = document.createElement("img");
    var aqhi_img = document.createElement("img");

    humidity_img.setAttribute("class", "small_img");
    rainfall_img.setAttribute("class", "small_img");
    uv_img.setAttribute("class", "small_img");
    aqhi_img.setAttribute("class", "small_img");
    
    var background_img = document.createElement("img");

    humidity_img.src = "images/drop-48.png";
    rainfall_img.src = "images/rain-48.png";
    // uv_img.src = "images/UVindex-48.png";

    weather_img.alt = "weather_img";
    humidity_img.alt = "humidity_img";
    rainfall_img.alt = "rainfall_img";
    uv_img.alt = "uv_img";
    aqhi_img.alt = "aqhi_img";

    var header_f = document.createElement("div");
    var warning = document.createElement("div");
    var time = document.createElement("div");
    header_f.setAttribute("id", "header_f");
    warning.setAttribute("id", "warning");
    time.setAttribute("id", "time");

    var warning_h = document.createElement("button");
    var warning_message = document.createElement("div");
    warning_h.setAttribute("id", "warning_h");
    warning_message.setAttribute("id", "warning_message");
    warning_message.style.display = "none";
    warning_h.innerHTML="Warning";

    warning_h.onclick = function(){
        if(warning_message.style.display=="none"){
            warning_message.style.display = "block";
        }
        else{
            warning_message.style.display = "none";
        }
    }

    // warning.addEventListener('mouseover', () => {warning_message.style.display = "block";}); 
	// warning.addEventListener('mouseout', () => {warning_message.style.display = "none";}); 

    weather.appendChild(weather_img);
    humidity.appendChild(humidity_img);
    rainfall.appendChild(rainfall_img);
    // uv.appendChild(uv_img);
 
    // fetch current weather
    const current_weather = fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
    .then((res) => res.json())
    .then(current_weather => {
        //header block part
        weather_img.src = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${current_weather.icon[0]}.png`;

        temperature.innerHTML=`${current_weather.temperature.data[1].value}<span>°C</span>`;
        humidity.innerHTML+=`${current_weather.humidity.data[0].value}<span>%</span>`;
        rainfall.innerHTML+=`${current_weather.rainfall.data[13].max}<span>mm</span>`;
        if (current_weather.uvindex != ""){
            uv_img.src = "images/UVindex-48.png";
            uv.appendChild(uv_img);
            uv.innerHTML+=current_weather.uvindex.data[0].value;
        }
        //test
        // warning_message.innerHTML="testing siodhf soahd sdcs ssdccdes sdjhdjdjdee aadcs scscdada adwve wdcs dddd";
        if (current_weather.warningMessage != ""){
            warning_message.innerHTML=current_weather.warningMessage;
        }
        time.innerHTML=`Last update: ${current_weather.updateTime.substr(11,5)}`; 
        var t = new Date().getHours();
        var rain = current_weather.rainfall.data[13].max;
        if (t>=6 && t <18){
            if (rain >0){
                header_block.style.background="url(images/water-drops-glass-day.jpg) no-repeat";
                header_block.style.backgroundSize="cover";
            }
            else{
                header_block.style.background="url(images/blue-sky.jpg) no-repeat fixed";
                header_block.style.backgroundSize="cover";
            }
        }
        else{
            header_block.style.color="white";
            if (rain >0){
                header_block.style.background="url(images/water-drops-glass-night.jpg) no-repeat";
                header_block.style.backgroundSize="cover";
            }
            else{
                header_block.style.background="url(images/night-sky.jpg) no-repeat";
                header_block.style.backgroundSize="cover";
            }
        }

    });
    
    header_div.appendChild(weather);
    header_div.appendChild(temperature);
    header_div.appendChild(humidity);
    header_div.appendChild(rainfall);
    header_div.appendChild(uv);

    warning.appendChild(warning_h);
    warning.appendChild(warning_message);

    header_f.appendChild(warning);
    header_f.appendChild(time);

    header_block.appendChild(header_h);
    header_block.appendChild(header_div);
    header_block.appendChild(header_f);

    body.appendChild(header_block);
    
}

function myDataBlock({cw, ws, as, aqhi, loc}){
    console.log(cw,ws, as, aqhi, loc);
    var body = document.querySelector('body');
    // implement myData block 
    var myData_block = document.createElement("section");
    var myData_left = document.createElement("div");
    var myData_right = document.createElement("div");
    myData_block.setAttribute("id", "myData_block");
    myData_left.setAttribute("id", "myData_left");
    myData_right.setAttribute("id", "myData_right");

    // myData block-left
    var left_h = document.createElement("div");
    left_h.innerHTML = "My Location";
    left_h.setAttribute("class", "body_title");

    var left1 = document.createElement("div");
    var left2 = document.createElement("div");
    var location = document.createElement("div");
    var loc_temp = document.createElement("div");
    var loc_rain = document.createElement("div");
    var loc_aqhi = document.createElement("div");
    left1.setAttribute("class", "left");
    left2.setAttribute("id", "left");
    location.setAttribute("id", "my_location");
    loc_temp.setAttribute("id", "loc_temp");
    loc_temp.setAttribute("class", "locTem");
    loc_rain.setAttribute("id", "loc_rain");
    loc_aqhi.setAttribute("id", "loc_aqhi");

    var rainfall_img = document.createElement("img");
    var aqhi_img = document.createElement("img");
    rainfall_img.setAttribute("id", "rainfall_img");
    aqhi_img.setAttribute("class", "small_img");

    rainfall_img.src="images/rain-48.png";
    rainfall_img.setAttribute("class", "small_img");

    loc_rain.appendChild(rainfall_img);
    loc_aqhi.appendChild(aqhi_img);

    // myData block-right
    var right_h = document.createElement("div");
    right_h.innerHTML = "Temperatures";
    right_h.setAttribute("class", "body_title");

    var right_h2 = document.createElement("p");
    right_h2.innerHTML = "Select the location";
    right_h2.setAttribute("class", "right_h2");
    
    var right_sel = document.createElement("select");//selection box
    right_sel.setAttribute("id", "right_sel");

    var right_tem =  document.createElement("div");//show local temperature
    right_tem.setAttribute("id", "right_tem");

    var list = [];
    var search = new Object();
    for(let j=0;j<Object.keys(cw.temperature.data).length;j++){
        list.push(cw.temperature.data[j].place);
        search[cw.temperature.data[j].place]=cw.temperature.data[j].value;
    }
    list.sort();
    for(let k=0;k<Object.keys(cw.temperature.data).length;k++){
        right_sel.innerHTML+=`<option value="${list[k]}">${list[k]}</option>`;
    }
    var v = search[right_sel.value];
    // right_tem.innerHTML=`<p class="locTem">${v}<span>°C</span></p>`;

    right_sel.onchange = function(event){
        var sele = document.getElementById("right_sel");
        var tempe = document.getElementById("right_tem");
        var val = search[sele.value];
        if(val){
            tempe.innerHTML=`<p class="locTem">${val}<span>°C</span></p>`;
        }
    }

    var suburb,district;
    if("suburb" in loc.address){
        suburb=loc.address.suburb;
    }
    else if("borough" in loc.address){
        suburb=loc.address.borough;
    }
    else if("town" in loc.address){
        suburb=loc.address.town;
    }
    else{
        suburb="unknown";
    }
    if("city_district" in loc.address){
        district=loc.address.city_district;
    }
    else if("county" in loc.address){
        district=loc.address.county;
    }
    else{
        district="unknown";
    }
    //location
    location.innerHTML=`<p>${district}</p><p>${suburb}</p>`;

    //！！I found the addresses of Central and Western District are different between the two APIs.
    if (district == "Central and Western District"){
        district = "Central &amp; Western District";
    }

    //loc_rain
    for (var ele of cw.rainfall.data) {
        if (ele.place == district) {
            loc_rain.innerHTML+=`<p class="locRain">${ele.max}<span>mm</span></p>`;
        }
    }
    //loc_temp & loc_aqhi
    const loc_lat = loc.lat*Math.PI/180;
    const loc_lon = loc.lon*Math.PI/180;

    var min_ = 10e6;
    var cs_;
    for (var ele of ws){
        let lat = (ele.latitude * Math.PI)/180;
        let lon = (ele.longitude * Math.PI)/180;
        const x = (lon-loc_lon)*Math.cos((lat+loc_lat)/2);
        const y = lat-loc_lat;
        const d = Math.sqrt(x*x+y*y);
        if(min_>d){
            min_ = d;
            cs_ = ele.station_name_en;
        }
    }

    for (var elem of cw.temperature.data){
        if (elem.place == cs_){
            loc_temp.innerHTML=`<p>${elem.value}<span>°C</span></p>`;
        }
    }

    var min = 10e6;
    var cs;
    for (var el of as){
        let lat = el.lat * Math.PI/180;
        let lon = el.lng * Math.PI/180;
        const x = (lon-loc_lon)*Math.cos((lat+loc_lat)/2);
        const y = lat-loc_lat;
        const d = Math.sqrt(x*x+y*y);
        if(min>d){
            min = d;
            cs = el.station;
        }
    }

    for (var elem of aqhi){
        if (elem.station == cs){
            // loc_aqhi.innerHTML+=`<p class="locTem">${elem.aqhi}</p><p>${elem.health_risk}</p>`;
            if(elem.health_risk=="Very High"){
                aqhi_img.src="images/aqhi-very_high.png";
            }
            else if(elem.health_risk=="High"){
                aqhi_img.src="images/aqhi-high.png";
            }
            else if(elem.health_risk=="Moderate"){
                aqhi_img.src="images/aqhi-moderate.png";
            }
            else if(elem.health_risk=="Serious"){
                aqhi_img.src="images/aqhi-serious.png";
            }
            else if(elem.health_risk=="Low"){
                aqhi_img.src="images/aqhi-low.png";
            }
            loc_aqhi.innerHTML+=`<p id="aqhi">${elem.aqhi}<br/>${elem.health_risk}</p>`;
        }
    }
    // aqhi_img.src="images/aqhi-low.png";


    myData_right.appendChild(right_h);
    myData_right.appendChild(right_h2);
    myData_right.appendChild(right_sel);
    myData_right.appendChild(right_tem);


    myData_left.appendChild(left_h);
    left1.appendChild(location);
    left1.appendChild(loc_temp);
    left2.appendChild(loc_rain);
    left2.appendChild(loc_aqhi);

    myData_left.appendChild(left1);
    myData_left.appendChild(left2);

    myData_block.appendChild(myData_left);
    myData_block.appendChild(myData_right);

    body.appendChild(myData_block);
}

function myData(){
    var body = document.querySelector('body');

    var myData_block = document.createElement("section");
    var myData_left = document.createElement("div");
    var myData_right = document.createElement("div");
    myData_left.setAttribute("id", "myData_left");
    myData_right.setAttribute("id", "myData_right");

    myData_block.appendChild(myData_left);
    myData_block.appendChild(myData_right);

    // myData block-left
    var left_h = document.createElement("div");
    left_h.innerHTML = "My Location";
    left_h.setAttribute("class", "body_title");

    var location = document.createElement("div");
    var loc_temp = document.createElement("div");
    var loc_rain = document.createElement("div");
    var loc_aqhi = document.createElement("div");
    location.setAttribute("id", "my_location");
    loc_temp.setAttribute("id", "loc_temp");
    loc_rain.setAttribute("id", "loc_rain");
    loc_aqhi.setAttribute("id", "loc_aqhi");

    var rainfall_img = document.createElement("img");
    var aqhi_img = document.createElement("img");
    rainfall_img.setAttribute("id", "rainfall_img");
    aqhi_img.setAttribute("id", "aqhi_img");


    // myData block-right
    var right_h = document.createElement("div");
    right_h.innerHTML = "Temperatures";
    right_h.setAttribute("class", "body_title");

    var right_h2 = document.createElement("p");
    right_h2.innerHTML = "Select the location";
    right_h2.setAttribute("class", "right_h2");
    
    var right_sel = document.createElement("select");//selection box
    right_sel.setAttribute("id", "right_sel");

    var right_tem =  document.createElement("div");//show local temperature
    right_tem.setAttribute("id", "right_tem");

    const current_weather = fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
    .then((res) => res.json())
    .then(current_weather => {
        // fetch current location
        navigator.geolocation.getCurrentPosition((pos) => {
            var lat = pos.coords.latitude;
            var lon = pos.coords.longitude;
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
            ).then((res) => res.json())
            .then(loc => {
                // myData block-left
                //get address
                var suburb,district;
                if("suburb" in loc.address){
                    suburb=loc.address.suburb;
                }
                else if("borough" in loc.address){
                    suburb=loc.address.borough;
                }
                else if("town" in loc.address){
                    suburb=loc.address.town;
                }
                else{
                    suburb="unknown";
                }
                if("city_district" in loc.address){
                    district=loc.address.city_district;
                }
                else if("county" in loc.address){
                    district=loc.address.county;
                }
                else{
                    district="unknown";
                }
                //location
                location.innerHTML=`<p>${district}</p><p>${suburb}</p>`;
                //loc_rain
                for (let ele of current_weather.rainfall.data) {
                    if (ele.place == district) {
                    loc_rain.innerHTML+=`<p class="locRain">${ele.max}<span>mm</span></p>`;
                    }
                }
                //loc_temp & loc_aqhi
                const loc_lat = loc.lat*Math.PI/180;
                const loc_lon = loc.lon*Math.PI/180;
                fetch("https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json")
                .then((res) => res.json())
                .then(station => {
                    var min = 10000;
                    var cs;
                    for (let ele in station){
                        let lat = ele.latitude * Math.PI/180;
                        let lon = ele.longitude * Math.PI/180;
                        const x = (lon-loc_lon)*Math.cos((lat+loc_lat)/2);
                        const y = lat-loc_lat;
                        const d = Math.sqrt(x*x+y*y);
                        if(min>d){
                            min = d;
                            cs = ele.station_name_en;
                        }
                    }
                    for (let elem in current_weather.temperature.data){
                        if (elem.place == cs){
                            loc_temp.innerHTML+=`<p class="locTem">${elem.value}<span>°C</span></p>`;
                        }
                    }
                });
                // aqhi_img.src="/images/aqhi-low.png";
                fetch("https://dashboard.data.gov.hk/api/aqhi-individual?format=json")
                .then((res) => res.json())
                .then(aqms => {
                    var min = 10000;
                    var cs;
                    for (let ele in aqms){
                        let lat = ele.latitude * Math.PI/180;
                        let lon = ele.longitude * Math.PI/180;
                        const x = (lon-loc_lon)*Math.cos((lat+loc_lat)/2);
                        const y = lat-loc_lat;
                        const d = Math.sqrt(x*x+y*y);
                        if(min>d){
                            min = d;
                            cs = ele.station;
                        }
                    }
                    for (let elem in aqms){
                        if (elem.station == cs){
                            loc_aqhi.innerHTML+=`<p class="locTem">${elem.aqhi}</p><p>${elem.health_risk}</p>`;
                            if(elem.health_risk=="Very High"){
                                aqhi_img.src="/images/aqhi-very_high.png";
                            }
                            else if(elem.health_risk=="High"){
                                aqhi_img.src="/images/aqhi-high.png";
                            }
                            else if(elem.health_risk=="Moderate"){
                                aqhi_img.src="/images/aqhi-moderate.png";
                            }
                            else if(elem.health_risk=="Serious"){
                                aqhi_img.src="/images/aqhi-serious.png";
                            }
                            else if(elem.health_risk=="Low"){
                                aqhi_img.src="/images/aqhi-low.png";
                            }
                        }
                    }
                });
            });
        });
    });

    loc_rain.appendChild(rainfall_img);
    loc_aqhi.appendChild(aqhi_img);

    myData_left.appendChild(left_h);
    myData_left.appendChild(location);
    myData_left.appendChild(loc_temp);
    myData_left.appendChild(loc_rain);
    myData_left.appendChild(loc_aqhi);
    
    myData_right.appendChild(right_h);
    myData_right.appendChild(right_h2);
    myData_right.appendChild(right_sel);
    myData_right.appendChild(right_tem);

    body.appendChild(myData_block);
}

function nineDayBlock(){
    var body = document.querySelector('body');
    var nineDay_block = document.createElement("section");
    nineDay_block.setAttribute("id", "nineDay_block");

    var nine_h = document.createElement("div");
    nine_h.innerHTML = "9-Day Forecast";
    nine_h.setAttribute("class", "body_title");
    nineDay_block.appendChild(nine_h);

    const current_weather = fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en")
    .then((res) => res.json())
    .then(wf => {
        for (let i=0;i<9;i++){
            var forecast = document.createElement("div");
            forecast.setAttribute("class", "forecast");
            forecast.innerHTML += `<p class="forecast1">${wf.weatherForecast[i].week.substr(0,3)} ${wf.weatherForecast[i].forecastDate.substr(6, 2)}/${wf.weatherForecast[i].forecastDate.substr(4, 2)}</p>`;
            var img_src = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${wf.weatherForecast[i].ForecastIcon}.png`;
            forecast.innerHTML += `<img src= ${img_src} alt="ForecastIcon"/>`
            forecast.innerHTML += `<p class="forecast1">${wf.weatherForecast[i].forecastMintemp.value}-${wf.weatherForecast[i].forecastMaxtemp.value} °C</p>`;
            forecast.innerHTML += `<p class="forecast1">${wf.weatherForecast[i].forecastMinrh.value}-${wf.weatherForecast[i].forecastMaxrh.value} %</p>`;    
            nineDay_block.appendChild(forecast);
        }
    });

    body.appendChild(nineDay_block);
}
 
function fetchData(){
    var cw =fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
    .then((res) => {
      return res.json();
    });
    var ws =fetch("https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json")
    .then((res) => {
      return res.json();
    });
    var as = fetch("data/aqhi-station-info.json")
    .then((res) => {
        return res.json();
    });
    var aqhi = fetch("https://dashboard.data.gov.hk/api/aqhi-individual?format=json")
    .then((res) => {
      return res.json();
    });
    
    var loc = new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            loc = fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
            .then((res) => {
                resolve(res.json());
            });
        });
    });

    return Promise.all([
        cw, ws, as, aqhi, loc
    ]).then((res)=>{
        var result = {cw:res[0],ws:res[1],as:res[2],aqhi:res[3],loc:res[4]};
        return(result);
    });
}
