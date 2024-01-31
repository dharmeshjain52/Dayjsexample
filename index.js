const dayjs=require('dayjs');
const local=require('dayjs/plugin/localizedFormat');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(local);
dayjs.extend(utc)
dayjs.extend(timezone)

/*initial loads*/
let date = dayjs().format('LL');
console.log(date);
let time=dayjs().format('LTS');
console.log(time);
let zone_curr=dayjs.tz.guess();
console.log(zone_curr);
//end-initial loads

/*display function*/
const disp=(date,time,zone)=>{
    document.querySelector("#date").innerText=date;
    document.querySelector("#zone").innerText=zone;
    document.querySelector("#time").innerText=time;
    }
disp(date,time,zone_curr);
global.window.date=dayjs;

/*Modal Class*/
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/*Modal Functionality:Select TimeZone*/
let zoneselect=document.querySelector("#zoneselect");
//adding timezones
for(zone in aryIanaTimeZones){
    let newop=document.createElement("option");
    newop.innerText=aryIanaTimeZones[zone];
    newop.value=aryIanaTimeZones[zone];
    if(newop.innerText==zone_curr){
        newop.selected="selected";
    }
    zoneselect.append(newop);
}
zoneselect.addEventListener("change",(event)=>{
    selectedZone(event.target);
    modal.style.display="none";
})
const selectedZone=(event)=>{
    zone_curr=event.value;
    let new_date=dayjs(new Date()).tz(zone_curr).format('LL');
    let new_time=dayjs(new Date()).tz(zone_curr).format('LTS');
    disp(new_date,new_time,zone_curr);
} 
//End of Code  