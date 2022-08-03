// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();
const apiKey = "&appid=a560750b6cefeea72b5dd8e5fb01bfc1&units=imperial";
const baseurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zipCode = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const entry = document.getElementById('entry');
document.getElementById('generate').addEventListener('click',Action);

function Action(){
    
     getWeather(baseurl,zipCode.value,apiKey)
     .then( (data)=>{
        console.log(data);
        postData('/postData', {date:newDate,temp:Math.round(data.main.temp),content:feeling.value} );
        updateUI();
     }).then(entry.style.display='block');
     
};


const getWeather = async (baseUrl,zip,key)=>{
    const result = await fetch (baseUrl+zip+key);
    try {
        const data = await result.json();
        if(data.cod == 200){
        console.log(data);
        return data ;
        }
        else
        {
            return alert(data.message);
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  });

    try {
      const newData = await response.json();
      console.log(newData);
      console.log('true');
      return newData
    }catch(error) {
    console.log("error", error);
    }
};

const updateUI = async () => {
    const requist = await fetch('/getAll');
    console.log("from update Ui")
    try {
        const allData = await requist.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temp}`;
        document.getElementById('content').innerHTML = `Fealings : ${allData.content}`;
    } catch (error) {
        console.log(error);
    }
}
