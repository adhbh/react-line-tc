//Import chart.js library
import Chart from 'chart.js';

//Extend linechart to customize default tooltip and dots
Chart.types.Line.extend({
  name: "LineTooltip",
  getPointsAtEvent(e) {
    const helpers = Chart.helpers;
    const pointsArray = [];
    const eventPosition = helpers.getRelativePosition(e);
    let pointIndex;
    for (let datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++) {
        for (pointIndex = 0; pointIndex < this.datasets[datasetIndex].points.length; pointIndex++) {
            const xpos = this.datasets[datasetIndex].points[pointIndex].x;
            const ypos = this.datasets[datasetIndex].points[pointIndex].y;
            const d = Math.sqrt((eventPosition.x-xpos)*(eventPosition.x-xpos) + (eventPosition.y-ypos)*(eventPosition.y-ypos));
            if (d<10) {
                this.datasets[datasetIndex].points[pointIndex].display = true;
                pointsArray.push(this.datasets[datasetIndex].points[pointIndex]);
                    return pointsArray;
            } else {
                this.datasets[datasetIndex].points[pointIndex].display = false;
            }
        }
    }
  },

  showTooltip(ChartElements, forceRedraw) {
        if (typeof this.activeElements === 'undefined') this.activeElements = [];
        if (typeof ChartElements === 'undefined') ChartElements = [];
        const isChanged = (function(Elements) {
            let changed = false;

            if (Elements.length !== this.activeElements.length){
                changed = true;
                return changed;
            }

            Chart.helpers.each(Elements, (element, index) => {
                if (element !== this.activeElements[index]){
                    changed = true;
                }
            }, this);
            return changed;
        }).call(this, ChartElements);

        if (!isChanged && !forceRedraw){
            return;
        }
        else{
            this.activeElements = ChartElements;
        }
        this.draw();
        if (ChartElements.length > 0){
            Chart.helpers.each(ChartElements, Element => {
                const tooltipPosition = Element.tooltipPosition();
                new Chart.Tooltip({
                    x: Math.round(tooltipPosition.x),
                    y: Math.round(tooltipPosition.y),
                    xPadding: this.options.tooltipXPadding,
                    yPadding: this.options.tooltipYPadding,
                    fillColor: this.options.tooltipFillColor,
                    textColor: this.options.tooltipFontColor,
                    fontFamily: this.options.tooltipFontFamily,
                    fontStyle: this.options.tooltipFontStyle,
                    fontSize: this.options.tooltipFontSize,
                    caretHeight: this.options.tooltipCaretSize,
                    cornerRadius: this.options.tooltipCornerRadius,
                    text: Chart.helpers.template(this.options.tooltipTemplate, Element),
                    chart: this.chart
                }).draw();
            }, this);
        }
        return this;
    },

    initialize(data) {
        const sets = arguments[0].datasets;
        for(let setIndex = 0 ; setIndex<sets.length; setIndex++) {
            const arr = sets[setIndex].data;
            const max = Math.max(...arr);
            const min = Math.min(...arr);
            arguments[0].datasets[setIndex].actual = [];
            for(let i =0; i<arr.length; i++) {
                arguments[0].datasets[setIndex].actual.push(arguments[0].datasets[setIndex].data[i]);
                arguments[0].datasets[setIndex].data[i] = ((arr[i] - min)/(max-min))*100;
            }
        } 
        Chart.types.Line.prototype.initialize.apply(this, arguments);
        const datasets = this.datasets;
        for(let setIndex = 0 ; setIndex<datasets.length; setIndex++) {
            const arr = datasets[setIndex].points;
            for(let i =0; i<arr.length; i++) {
                this.datasets[setIndex].points[i].actual = arguments[0].datasets[setIndex].actual[i];
            }
        } 
    }

});