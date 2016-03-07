const chartData = {
    labels: ["FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG","SEP","OCT","NOV","DEC","JAN"],
    datasets: [
        {
            label: "Spend",
            fillColor: "#9ae250",
            strokeColor: "#9ae250",
            pointColor: "#fff",
            pointStrokeColor: "#9ae250",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#9ae250",
            data: [5, 4.5, 4, 4.2, 4.7, 5.4, 5.7, 6.4, 5.0, 5.9, 6.2, 5.3]
        },
        {
            label: "Utilization",
            fillColor: "#4ed8fd",
            strokeColor: "#4ed8fd",
            pointColor: "#fff",
            pointStrokeColor: "#4ed8fd",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#4ed8fd",
            data: [65, 70, 72, 76, 78, 83, 74, 65, 63, 54, 85, 88]
        },
        {
            label: "Rating",
            fillColor: "#fd8f2a",
            strokeColor: "#fd8f2a",
            pointColor: "#fff",
            pointStrokeColor: "#fd8f2a",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#fd8f2a",
            data: [4, 4.2, 4.3, 3.9, 4, 4.1, 4.4, 4.5, 4.3, 4.3, 4.2, 4.4]
        }
    ]
};

export { chartData };