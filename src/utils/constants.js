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

export const chartOptions = {
    width: 250,
    height: 250,
    color: '#2980B9',
    margin: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20
    },
    animate: {
        type: 'delayed',
        duration: 200
    },
    axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
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
        showLines: false,
        showLabels: true,
        showTicks: false,
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
