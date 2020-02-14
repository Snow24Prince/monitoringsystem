var myPageId = 'home.html';
window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};
window.fn.load = function(page) {
  var menu = document.getElementById('menu');
  var myNavigator = document.getElementById('myNavigator');
  if(myPageId != page){
    myPageId = page;
    menu.close();
    myNavigator.resetToPage(page, { animation: 'fade' });
  }else {
    menu.close();
  };
};
var BluetoothStatus = "No Connection";
var lineChartValueA = [0];
var lineChartValueB = [0];
var macAddress = "00:18:E5:04:A0:A9";
var app = {
    initialize: function(){
      bluetoothSerial.isEnabled(app.onDeviceReady, function(){
        alert('Please Enable Bluetooth');
      });
    },
    onDeviceReady: function() {
        bluetoothSerial.connect(macAddress, app.onConnect, app.onDisconnect);
        statusDiv.innerHTML = "Connecting..."
    },
    onConnect: function() {
        bluetoothSerial.subscribe("\n", app.onMessage, app.subscribeFailed);
        statusDiv.innerHTML = "Connected to " + macAddress + ".";
        BluetoothStatus = "Connected to " + macAddress + ".";
    },
    onDisconnect: function() {
        alert("Disconnected");
        statusDiv.innerHTML="Disconnected.";
    },
    onMessage: function(data) {
        myArray = JSON.parse(data);
        configBar.data.datasets[0].data[0] = myArray[0];
        configBar.data.datasets[1].data[0] = myArray[1];
        configBar.data.datasets[2].data[0] = myArray[2];
        configBar.data.datasets[3].data[0] = myArray[3];
        configA.data.datasets[0].data[0] = myArray[4];
        configA.data.datasets[0].data[1] = 100-myArray[4];
        configB.data.datasets[0].data[0] = myArray[5];
        configB.data.datasets[0].data[1] = 100-myArray[5];
        lineChartValueA = myArray[6];
        lineChartValueB = myArray[7];
        configC.data.datasets[0].data[0] = myArray[8];
        configC.data.datasets[0].data[1] = 150-myArray[8];
        configD.data.datasets[0].data[0] = myArray[9];
        configD.data.datasets[0].data[1] = 100-myArray[9];
        //waterlevelVal = myArray[8];
      //myChartE.data.datasets[0].data[0] = myArray[6];

    },
    subscribeFailed: function() {
        alert("Bluetooth device could not be found");
    }
};
var configA = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [1,1],
      backgroundColor: [
        window.chartColors.green,
        window.chartColors.white,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Moisture Content'
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Soil Temperature A'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      doughnutlabel: {
        labels: [{
          text: chartValueA,
          font: {
            size: '50',
            family: 'Arial, Helvetica, sans-serif',
            //style: 'italic',
            weight: 'bold'
          },
          color: window.chartColors.green
        }]
      }
    }
  }
};
var configB = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [1,1],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.white,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Moisture Content'
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Soil Temperature B'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      doughnutlabel: {
        labels: [{
          text: chartValueB,
          font: {
            size: '50',
            family: 'Arial, Helvetica, sans-serif',
            //style: 'italic',
            weight: 'bold'
          },
          color: window.chartColors.green
        }]
      }
    }
  }
};
var configC = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [1,1],
      backgroundColor: [
        window.chartColors.green,
        window.chartColors.white,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Water'
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Water Level'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      doughnutlabel: {
        labels: [{
          text: chartValueC,
          font: {
            size: '50',
            family: 'Arial, Helvetica, sans-serif',
            //style: 'italic',
            weight: 'bold'
          },
          color: window.chartColors.green
        }]
      }
    }
  }
};
var configD = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [1,1],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.white,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Temperature'
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'System Temperature'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      doughnutlabel: {
        labels: [{
          text: chartValueD,
          font: {
            size: '50',
            family: 'Arial, Helvetica, sans-serif',
            //style: 'italic',
            weight: 'bold'
          },
          color: window.chartColors.green
        }]
      }
    }
  }
};
var configE = {
  type: "line",
  data: {
    labels: [" ", " ", " ", " ", " "],
    datasets: [{
      label: "Temperature",
      data: [],
      backgroundColor: window.chartColors.green,
      borderColor: window.chartColors.green,
      borderWidth: 1,
      fill: true
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Temperature'
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          max: 40,
          min: 0,
          stepSize: 20
        }
      }]
    },
    elements: {
      line: {
        tension: 0.5,
        // no smooth
      }
    }
  }
};
var configF = {
  type: "line",
  data: {
    labels: [" ", " ", " ", " ", " "],
    datasets: [{
      label: "Humidity",
      data: [],
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      borderWidth: 1,
      fill: true
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Humidity'
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          max: 100,
          min: 0,
          stepSize: 50
        }
      }]
    },
    elements: {
      line: {
        tension: 0.5,
        // no smooth
      }
    }
  }
};
var configBar = {
  type: 'bar',
  data: {
    datasets: [{
      data: [0],
      backgroundColor: [
        window.chartColors.green,
      ],
      label: 'Sensor A',
      borderColor: window.chartColors.green,
      borderWidth: 1
    },{
      data: [0],
      backgroundColor: [
        window.chartColors.blue,
      ],
      label: 'Sensor B',
      borderColor: window.chartColors.blue,
      borderWidth: 1
    },{
      data: [0],
      backgroundColor: [
        window.chartColors.red,
      ],
      label: 'Sensor C',
      borderColor: window.chartColors.red,
      borderWidth: 1
    },{
      data: [0],
      backgroundColor: [
        window.chartColors.orange,
      ],
      label: 'Sensor D',
      borderColor: window.chartColors.orange,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          max: 100,
          min: 0,
          stepSize: 50
        }
      }]
    },
    responsive: true,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Temperature Comparison'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};
function updateBar(){
  myBar = setTimeout(function(){
    tempValueA.innerHTML = configBar.data.datasets[0].data[0] + "°";
    tempValueB.innerHTML = configBar.data.datasets[1].data[0] + "°";
    tempValueC.innerHTML = configBar.data.datasets[2].data[0] + "°";
    tempValueD.innerHTML = configBar.data.datasets[3].data[0] + "°";
    myBarChart.update();
    updateBar();
  }, 1000);
};
function myUpdateE(){
  myVarE = setTimeout(function(){
    document.getElementById('tempValue').innerHTML = lineChartValueA + "°";
    myChartE.data.datasets[0].data.push(lineChartValueA);
    myChartE.update(0);
    if(myChartE.data.datasets[0].data.length >= 5){
      myChartE.data.datasets[0].data.splice(0,1);
    }
    myUpdateE();
  }, 1000);
};
function myUpdateF(){
  myVarF = setTimeout(function(){
    document.getElementById('humidValue').innerHTML = lineChartValueB;
    myChartF.data.datasets[0].data.push(lineChartValueB);
    myChartF.update(0);
    if(myChartF.data.datasets[0].data.length >= 5){
      myChartF.data.datasets[0].data.splice(0,1);
    }
    myUpdateF();
  }, 1000);
};
function myUpdateA(){
  myTempA = setTimeout(function(){
    myChartA.update();
    myUpdateA();
  },1000);
};
function myUpdateB(){
  myTempB = setTimeout(function(){
    myChartB.update();
    myUpdateB();
  },1000);
};
function myUpdateC(){
  myTempC = setTimeout(function(){
    myChartC.update();
    myUpdateC();
  },1000);
};
function myUpdateD(){
  myTempD = setTimeout(function(){
    myChartD.update();
    myUpdateD();
  },1000);
};
function myWaterLevel(){
  setTimeout(function(){
    var random = Math.floor(Math.random() * 10) + 1;
    document.getElementById('waterLevel').innerHTML = random;
    myWaterLevel();
  },1000);
}
function stopUpdate(page){
  clearTimeout(page);
};
function stopMultiUpdate(x,y){
  clearTimeout(x);
  clearTimeout(y);
}
function chartValueA(){
  return configA.data.datasets[0].data[0] + "°C";
};
function chartValueB(){
  return configB.data.datasets[0].data[0] + "°C";
};
function chartValueC(){
  return configC.data.datasets[0].data[0] + "%";
};
function chartValueD(){
  return configD.data.datasets[0].data[0] + "°C";
};
