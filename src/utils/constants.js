export const colors = {
    WHITE: '#FFFFFF',
    HOOMIE_50: '#99D6EA',
    HOOMIE_100: '#7FCCE5',
    HOOMIE_200: '#66C1E0',
    HOOMIE_300: '#4CB7DB',
    HOOMIE_400: '#33ADD6',
    HOOMIE_500: '#19a3d1',
    HOOMIE_COLOR: '#0099CC',
    LIGHT_GREY: '#AAAAAA'
};

export const serverIp = "hoomieserver.herokuapp.com";

export const chartOptions = {
    width: 280,
    height: 250,
    color: colors.HOOMIE_COLOR,
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
