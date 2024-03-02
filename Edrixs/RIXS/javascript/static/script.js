//Alex Poulin

//these are the main things you need to update here at the top
//const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9002/ws');

//get available atoms and shells
const avail_atomsJSON = "../static/avail_atoms.json";
const avail_shellsJSON = "../static/avail_shells.json";



let avail_atoms = [];
fetch(avail_atomsJSON)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log("ll");
        atomNames = data[0].atoms;
        //console.log(atomNames);

        // Populate sequence dropdown with options
        var atomTypeDropdown = document.getElementById("atomDropdown");
        //atomTypeDropdown.className = 'dropdown';
        atomNames.forEach(name => {
            var option = document.createElement("option");
            option.text = name;
            option.value = name;
            //sequenceTypeDropdown.add(option);

            atomTypeDropdown.add(option);
        });
    });

let avail_shells = [];
fetch(avail_shellsJSON)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log("ll");
        shellNames = data[0].shells;
        //console.log(shellNames);

        // Populate sequence dropdown with options
        var shellTypeDropdown = document.getElementById("shellDropdown");
        shellTypeDropdown.className = 'dropdown';
        shellNames.forEach(name => {
            var option = document.createElement("option");
            option.text = name;
            option.value = name;
            //sequenceTypeDropdown.add(option);

            shellTypeDropdown.add(option);
        });
    });

sendStateCommand = function () {
    //
    //var stateToSet = document.getElementById("commandDropdown").value;
    //var command = { command: "SET_STATE", newState: stateToSet };
    //socket.send(JSON.stringify(command));

    //stateHTML.innerHTML = "&nbsp;Last Sent: " + stateToSet;
    //console.log("sent ", stateToSet, " command");
    const name = document.getElementById("name_").innerHTML

    /*
        function runPyScript(input){
        var jqXHR = $.ajax({
            type: "POST",
            url: "/login",
            async: false,
            data: { mydata: input }
        });

        return jqXHR.responseText;
    }

    $('#submitbutton').click(function(){
        datatosend = 'this is my matrix';
        result = runPyScript(datatosend);
        console.log('Got back ' + result);
    });
        */
        

}


/*
// functions to define the state sets iteratively from json
var testType = [];

function updateBatches() {
    var selectedtestType = document.getElementById("testTypeDropdown").value;
    var batchDropdown = document.getElementById("batchDropdown");

    // Clear existing options in batch dropdown
    batchDropdown.innerHTML = "";

    // Add new options based on selected testType
    testType.forEach(function (testType) {
        if (testType.name === selectedtestType) {
            testType.batches.forEach(function (batch) {
                var option = document.createElement("option");
                option.text = batch.name;
                option.value = batch.name;
                batchDropdown.add(option);
            });
        }
    });

    // Trigger update of commands
    updateCommands();
}


function updateCommands() {
    var selectedtestType = document.getElementById("testTypeDropdown").value;
    var selectedBatch = document.getElementById("batchDropdown").value;
    var commandDropdown = document.getElementById("commandDropdown");

    // Clear existing options in command dropdown
    commandDropdown.innerHTML = "";

    // Add new options based on selected testType and batch
    testType.forEach(function (testType) {
        if (testType.name === selectedtestType) {
            testType.batches.forEach(function (batch) {
                if (batch.name === selectedBatch) {
                    batch.commands.forEach(function (command) {
                        var option = document.createElement("option");
                        option.text = command.name;
                        option.value = command.value;
                        commandDropdown.add(option);
                    });
                }
            });
        }
    });
}

///


let pressureCheckboxValue = "pressureSensorsChecked";
let tempCheckboxValue = "tempSensorsChecked";
let loadCheckboxValue = "loadSensorsChecked";
let pressureCheckbox2Value = "";
let enableOverrideCheckboxValue = "";
let sequencerCheckboxValue = "";

//see if things are checked/unchecked to update what's on the graphs
const checkbox_1 = document.getElementById("checkbox_1");
checkbox_1.addEventListener("change", function () {
    pressureCheckboxValue = this.checked ? this.value : "";
    console.log(pressureCheckboxValue);
    if (pressureCheckboxValue === "pressureSensorsChecked") {
        chartData_1 = [];
    }
});

const checkbox_2 = document.getElementById("checkbox_2");
checkbox_2.addEventListener("change", function () {
    tempCheckboxValue = this.checked ? this.value : "";
    console.log(tempCheckboxValue);
    if (tempCheckboxValue === "tempSensorsChecked") {
        chartData_2 = [];
    }
});

const checkbox_3 = document.getElementById("checkbox_3");
checkbox_3.addEventListener("change", function () {
    loadCheckboxValue = this.checked ? this.value : "";
    console.log(loadCheckboxValue);
    if (loadCheckboxValue === "loadSensorsChecked") {
        chartData_3 = [];
    }
});

const checkbox_4 = document.getElementById("checkbox_4");
checkbox_4.addEventListener("change", function () {
    pressureCheckbox2Value = this.checked ? this.value : "";
    console.log(pressureCheckbox2Value);
    if (pressureCheckbox2Value === "pressureSensors2Checked") {
        chartData_4 = [];
    }
});

const overrideCheckbox = document.getElementById("overrideCheckbox");
overrideCheckbox.addEventListener("change", function () {
    enableOverrideCheckboxValue = this.checked ? this.value : "";
    console.log(enableOverrideCheckboxValue);
    if (enableOverrideCheckboxValue === "enableOverrideChecked") {
        document.getElementById("overrideBtn").disabled = false;
    } else {
        document.getElementById("overrideBtn").disabled = true;
    }
});

const sequencerCheckbox = document.getElementById("sequenceCheckbox");
sequencerCheckbox.addEventListener("change", function () {
    enableSequenceCheckboxValue = this.checked ? this.value : "";
    console.log(enableSequenceCheckboxValue);
    if (enableSequenceCheckboxValue === "sequenceBoxChecked") {
        document.getElementById("sequencerButton").disabled = false;
    } else {
        document.getElementById("sequencerButton").disabled = true;
    }
});
///

// Sensor reading box population

const sensorContainer = document.getElementById('sensorContainer');
const errorDiv = document.getElementById('error');
let lastUpdateTime = 0;
const throttleInterval = 50;

function createSensorDiv(sensorName, sensorValue, unit) {
    const sensorDiv = document.createElement('div');
    sensorDiv.className = 'sensor-value';
    sensorDiv.textContent = `${sensorName}: ${sensorValue.toFixed(4)} ${unit}`;
    return sensorDiv;
}

function displaySensors(sensorGroup, groupName) {
    Object.entries(sensorGroup).forEach(([key, sensor]) => {
        //const sensorDiv = createSensorDiv(`${groupName} - ${key}`, sensor.sensorReading, sensor.unit);
        const sensorDiv = createSensorDiv(`${key}`, sensor.sensorReading, sensor.unit);
        sensorContainer.appendChild(sensorDiv); //TODO
    });
}

socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
});

let currJSONData = "";

socket.addEventListener('message', (event) => {
    try {
        const data = JSON.parse(event.data);
        processData(data);
        updateValveStates(data);
        currJSONData = data;
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = 'Error processing data: ' + error.message;
        console.error('Error processing data:', error);
    }
});

function updateValveStates(data){
    if(enableOverrideCheckboxValue === "enableOverrideChecked"){ //don't change while in override
        return;
    }
    
    for(v of valveNames) {
        let valveReading = data.data.valves[v].valveState;
        document.getElementById(v).value = valveReading;
    }
}

var stateHTML = document.getElementById("lastStateCommandSent");


sendSequenceCommand = function () {
    //{"command": "START_SEQUENCE", "sequence": sequence}
    var sequenceToSet = document.getElementById("sequenceDropdown").value;
    var command = { command: "START_SEQUENCE", sequence: sequenceToSet };
    socket.send(JSON.stringify(command));

    stateHTML.innerHTML = "&nbsp;Last Sent: " + stateToSet;
    console.log("sent ", sequenceToSet, " sequence command");
}

sendOverrideCommand = function () {
    var activeElementObj = "";
    for(v of valveNames) {
        activeElementObj = activeElementObj + '\"' +v + '\"'+ ': ' + '\"'+document.getElementById(v).value + '\",';
    }
    //remove comma at end to create valid json
    activeElementObj = activeElementObj.substring(0, activeElementObj.lastIndexOf(",")) + activeElementObj.substring(activeElementObj.lastIndexOf(",") + 1);
    var obj = '{'
        + '"command": "SET_ACTIVE_ELEMENTS",'
        + '"activeElements": {'
        + activeElementObj
        + '}'
        + '}';
    socket.send(obj);
    console.log(obj);

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes(); // Be careful! January is 0, not 1
    const currentSeconds = currentDate.getSeconds();
    const dateString = currentHour + ":" + (currentMinutes) + ":" + currentSeconds;
    document.getElementById("lastSentOverrideAt").innerHTML = "Last sent override at: " +dateString;

}

function forceSetOnlineSafe() {
    var command = { command: "SET_STATE", newState: "ONLINE_SAFE_D" };
    socket.send(JSON.stringify(command));
    stateHTML.innerHTML = "&nbsp;Last Sent: ONLINE_SAFE_D";
}


function downloadJSONFile() {
    const filename = "curr_json.json";

    // Convert the JavaScript object into a JSON string
    const json = JSON.stringify(currJSONData);

    // Create a file object using the JSON string and set the type as 'application/json'
    const file = new Blob([json], { type: 'application/json' });

    // Create a URL for the file object
    const url = URL.createObjectURL(file);

    // Create a link element and set its attributes
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Programmatically click the link element to initiate the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
    errorDiv.textContent = 'WebSocket connection closed. Please refresh the page to reconnect.';
    alert("connection closed or lost");
});

socket.addEventListener('error', (event) => {
    console.log('WebSocket error:', event);
    errorDiv.textContent = 'WebSocket error. Please check the connection.';
    alert("websockets error, check console!");
});

//----------//
//PLOT CODE//

const chartDiv_1 = document.getElementById('chart1');
const chartDiv_2 = document.getElementById('chart2');
const chartDiv_3 = document.getElementById('chart3');
const chartDiv_4 = document.getElementById('chart4');

const visibleDataPoints = 30;

// Initialize chart
let chartData_1 = [];
let chartData_2 = [];
let chartData_3 = [];
let chartData_4 = [];

//expand and edit these if you want to update chart titles/colors/text
const chartLayout = {
    xaxis: {
        title: {
            text: 'Time',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    yaxis: {
        title: {
            text: 'Sensor Value (PSI)',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    title: {
        text: 'Pressure Sensors',
        font: {
            color: 'white'
        }
    },
    legend: {
        font: {
            color: 'white'
        }
    },
    plot_bgcolor: '#D3D3D3',
    paper_bgcolor: '#181F2D',
};
const chart2Layout = {
    xaxis: {
        title: {
            text: 'Time',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    yaxis: {
        title: {
            text: 'Temperature Value',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    title: {
        text: 'Temperature Sensors',
        font: {
            color: 'white'
        }
    },
    legend: {
        font: {
            color: 'white'
        }
    },
    plot_bgcolor: '#D3D3D3',
    paper_bgcolor: '#181F2D',
};
const chart3Layout = {
    xaxis: {
        title: {
            text: 'Time',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    yaxis: {
        title: {
            //text: 'Load Cell Value', //TODO: update this and later vals if you want to add load cells back  in
            text: 'Sensor Reading (PSI)',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    title: {
        //text: 'Load Cell Sensors',
        text: 'Pressure Sensors',
        font: {
            color: 'white'
        }
    },
    showlegend: true,
    legend: {
        font: {
            color: 'white'
        }
    },
    plot_bgcolor: '#D3D3D3',
    paper_bgcolor: '#181F2D',
};

const chart4Layout = {
    xaxis: {
        title: {
            text: 'Time',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    yaxis: {
        title: {
            text: 'Sensor Value (PSI)',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    title: {
        text: 'Pressure Sensors',
        font: {
            color: 'white'
        }
    },
    legend: {
        font: {
            color: 'white'
        }
    },
    plot_bgcolor: '#D3D3D3',
    paper_bgcolor: '#181F2D',
};

////// CHARTS //////
function initChart_1(sensors) {
    Object.keys(sensors).forEach((key) => {
        const sensor = sensors[key];
        chartData_1.push({
            x: [sensor.timeStamp],//new Date().getTime()
            y: [sensor.sensorReading],
            mode: 'lines+markers',
            name: key
        });
    });
    Plotly.newPlot(chartDiv_1, chartData_1, chartLayout);
}

function updateChart_1(sensors) {
    let latestTimeStamp = -Infinity;

    Object.keys(sensors).forEach((key, index) => {
        const sensor = sensors[key];
        chartData_1[index].x.push(sensor.timeStamp);
        chartData_1[index].y.push(sensor.sensorReading);

        // Remove old data points if the number of data points exceeds visibleDataPoints
        if (chartData_1[index].x.length > visibleDataPoints) {
            chartData_1[index].x.shift();
            chartData_1[index].y.shift();
        }

        latestTimeStamp = Math.max(latestTimeStamp, sensor.timeStamp);
    });

    // Update x-axis range
    const startTime = latestTimeStamp - visibleDataPoints * throttleInterval;
    chartLayout.xaxis.range = [startTime, latestTimeStamp];
    Plotly.update(chartDiv_1, chartData_1, chartLayout);
}

///2nd chart

function initChart_2(sensors) {
    Object.keys(sensors).forEach((key) => {
        const sensor = sensors[key];
        chartData_2.push({
            x: [sensor.timeStamp],//new Date().getTime()
            y: [sensor.sensorReading],
            mode: 'lines+markers',
            name: key
        });
    });
    Plotly.newPlot(chartDiv_2, chartData_2, chart2Layout);
}

function updateChart_2(sensors) {
    let latestTimeStamp = -Infinity;

    Object.keys(sensors).forEach((key, index) => {
        const sensor = sensors[key];
        chartData_2[index].x.push(sensor.timeStamp);
        chartData_2[index].y.push(sensor.sensorReading);

        // Remove old data points if the number of data points exceeds visibleDataPoints
        if (chartData_2[index].x.length > visibleDataPoints) {
            chartData_2[index].x.shift();
            chartData_2[index].y.shift();
        }

        latestTimeStamp = Math.max(latestTimeStamp, sensor.timeStamp);
    });

    // Update x-axis range
    const startTime = latestTimeStamp - visibleDataPoints * throttleInterval;
    chartLayout.xaxis.range = [startTime, latestTimeStamp];
    Plotly.update(chartDiv_2, chartData_2, chart2Layout);
}

//3rd chart

function initChart_3(sensors) {
    Object.keys(sensors).forEach((key) => {
        const sensor = sensors[key];
        chartData_3.push({
            x: [sensor.timeStamp],//new Date().getTime()
            y: [sensor.sensorReading],
            mode: 'lines+markers',
            //name: 'LC_01' //TODO: modify this if there are more load cell sensors (disabled because currently set to pressure sensors)
            name: key
        });
    });
    Plotly.newPlot(chartDiv_3, chartData_3, chart3Layout);
}

function updateChart_3(sensors) {
    let latestTimeStamp = -Infinity;

    Object.keys(sensors).forEach((key, index) => {
        const sensor = sensors[key];
        chartData_3[index].x.push(sensor.timeStamp);
        chartData_3[index].y.push(sensor.sensorReading);

        // Remove old data points if the number of data points exceeds visibleDataPoints
        if (chartData_3[index].x.length > visibleDataPoints) {
            chartData_3[index].x.shift();
            chartData_3[index].y.shift();
        }

        latestTimeStamp = Math.max(latestTimeStamp, sensor.timeStamp);
    });

    // Update x-axis range
    const startTime = latestTimeStamp - visibleDataPoints * throttleInterval;
    chartLayout.xaxis.range = [startTime, latestTimeStamp];
    Plotly.update(chartDiv_3, chartData_3, chart3Layout);
}

//4th chart

function initChart_4(sensors) {
    Object.keys(sensors).forEach((key) => {
        const sensor = sensors[key];
        chartData_4.push({
            x: [sensor.timeStamp],//new Date().getTime()
            y: [sensor.sensorReading],
            mode: 'lines+markers',
            name: key
        });
    });
    Plotly.newPlot(chartDiv_4, chartData_4, chart4Layout);
}

function updateChart_4(sensors) {
    let latestTimeStamp = -Infinity;

    Object.keys(sensors).forEach((key, index) => {
        const sensor = sensors[key];
        chartData_4[index].x.push(sensor.timeStamp);
        chartData_4[index].y.push(sensor.sensorReading);

        // Remove old data points if the number of data points exceeds visibleDataPoints
        if (chartData_4[index].x.length > visibleDataPoints) {
            chartData_4[index].x.shift();
            chartData_4[index].y.shift();
        }

        latestTimeStamp = Math.max(latestTimeStamp, sensor.timeStamp);
    });

    // Update x-axis range
    const startTime = latestTimeStamp - visibleDataPoints * throttleInterval;
    chartLayout.xaxis.range = [startTime, latestTimeStamp];
    Plotly.update(chartDiv_4, chartData_4, chart4Layout);
}




/// end chart creation ///

var pneumaticSysPress = document.getElementById("pneumaticSysPress");
function displayPneumaticSystemPressure(pneumaticPressureReading) {
    if (pneumaticPressureReading.sensorReading < minSafePneumaticPressure) {
        pneumaticSysPress.innerHTML = "<span class=\"alarm\">LOW PNEUMATIC PRESSURE: " + pneumaticPressureReading.sensorReading + " " + pneumaticPressureReading.unit + "</span>";
    } else {
        pneumaticSysPress.innerHTML = "Available Pneumatic Pressure: " + pneumaticPressureReading.sensorReading + " " + pneumaticPressureReading.unit;
    }
}

var testStandState = document.getElementById("currentTestStandState");
function displayTestStandState(currentState) {
    testStandState.innerHTML = "Current State:&nbsp;" + currentState;
}

var lastMessage = document.getElementById("lastMessage");
function displayLastMessage(message) {
    lastMessage.innerHTML = "Last Message:&nbsp;" + message;
}

// Modify processData function to initialize and update the chart
function processData(data) {
    if (data.command == 'DATA') {
        const currentTime = new Date().getTime();
        if (currentTime - lastUpdateTime < throttleInterval) {
            return;
        }
        sensorContainer.innerHTML = '';

        displaySensors(data.data.loadCellSensors, 'Load Cell Sensor');
        displaySensors(data.data.pressureSensors, 'Pressure Sensor');
        displaySensors(data.data.tempSensors, 'Temperature Sensor');

        // displayPneumaticSystemPressure(data.data.pressureSensors.Pneumatic);
        // displayTestStandState(data.currentState);

        if (chartData_1.length === 0) {
            initChart_1(data.data.pressureSensors);
        } else {
            if (pressureCheckboxValue === "pressureSensorsChecked") {
                updateChart_1(data.data.pressureSensors);
            }
        }

        if (chartData_2.length === 0) {
            initChart_2(data.data.tempSensors);
        } else {
            if (tempCheckboxValue === "tempSensorsChecked") {
                updateChart_2(data.data.tempSensors);
            }
        }
        if (chartData_3.length === 0) {
            initChart_3(data.data.pressureSensors);
        } else {
            if (loadCheckboxValue === "loadSensorsChecked") {
                updateChart_3(data.data.pressureSensors);
            }
        }
        ///

        if (chartData_4.length === 0) {
            initChart_4(data.data.pressureSensors);
        } else {
            if (pressureCheckbox2Value === "pressureSensors2Checked") {
                updateChart_4(data.data.pressureSensors);
            }
        }

        lastUpdateTime = currentTime;
    } else if (data.command == 'MESSAGE') {
        displayLastMessage(data.statement);
    } else if (data.command == 'STATE_TRANSITION') {
        displayTestStandState(data.newState + " at time " + data.newStand);
    } else if (data.command == 'REDLINE_REPORT') {
        // todo: implement redline report
    } else {
        // else here
    }
}
*/