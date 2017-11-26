export const colors = {
  WHITE: '#FFFFFF',
  BLUE_50: '#dadcff',
  BLUE_100: '#b6baff',
  BLUE_200: '#9197ff',
  BLUE_300: '#6d75ff',
  BLUE_400: '#4852FF',
  BLUE_500: '#2430ff',
};

export const serverIp = "hoomieserver.herokuapp.com";
export const serverPort = "8080";

export const chartOptions = {
    width: 280,
    height: 280,
    color: '#2980B9',
    margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20
    },
    animate: {
        type: 'delayed',
        duration: 200
    },
    axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
        }
    },
    axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
        }
    }
};
