/* JSHint configurations */
/* jshint esversion: 6 */
/* jshint -W097 */

/**
 * Created by Leandro Luque on 08/06/2017.
 */

'use strict';

let svgChanger = null;

class SVGArea {

    constructor(svgSelector = "#svg") {
        this._idCount = 1;
        this._svg = document.querySelector(svgSelector);
        this._namespace = "http://www.w3.org/2000/svg";
        this._elements = [];
    }

    get idCount() {
        return this._idCount;
    }

    set idCount(value) {
        this._idCount = value;
    }

    generateId() {
        return "element_" + (this._idCount++);
    }

    get svg() {
        return this._svg;
    }

    set svg(value) {
        this._svg = value;
    }

    get namespace() {
        return this._namespace;
    }

    set namespace(value) {
        this._namespace = value;
    }

    get elements() {
        return this._elements;
    }

    set elements(value) {
        this._elements = value;
    }

    addElement(element) {
        this._elements.push(element);
        return element;
    }

    circle(centerX = 50, centerY = 50, radius = 100) {
        let newCircle = new Circle(centerX, centerY, radius);
        newCircle.id = this.generateId();
        newCircle.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newCircle);
        drawer.svgArea = this;
        var drawedCircle = drawer.draw(newCircle);
        this.svg.appendChild(drawedCircle);

        newCircle.drawed = drawedCircle;

        return this.addElement(newCircle);
    }

    ellipse(centerX = 50, centerY = 50, radiusX = 100, radiusY = 50) {
        let newEllipse = new Ellipse(centerX, centerY, radiusX, radiusY);
        newEllipse.id = this.generateId();
        newEllipse.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newEllipse);
        drawer.svgArea = this;
        var drawedEllipse = drawer.draw(newEllipse);
        this.svg.appendChild(drawedEllipse);

        newEllipse.drawed = drawedEllipse;

        return this.addElement(newEllipse);
    }

    rect(x1 = 10, y1 = 10, x2 = 100, y2 = 20) {
        let newRectangle = new Rectangle(x1, y1, x2, y2);
        newRectangle.id = this.generateId();
        newRectangle.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newRectangle);
        drawer.svgArea = this;
        var drawedRectangle = drawer.draw(newRectangle);
        this.svg.appendChild(drawedRectangle);

        newRectangle.drawed = drawedRectangle;

        return this.addElement(newRectangle);
    }

    text(x = 10, y = 10, text = "This is an example text") {
        let newText = new Text(x, y, text);
        newText.id = this.generateId();
        newText.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newText);
        drawer.svgArea = this;
        var drawedText = drawer.draw(newText);
        this.svg.appendChild(drawedText);

        newText.drawed = drawedText;

        return this.addElement(newText);
    }

    vgroup(x = 10, y = 10) {
        let newVGroup = new VerticalGroup(x, y);
        newVGroup.id = this.generateId();
        newVGroup.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newVGroup);
        drawer.svgArea = this;
        var drawedVGroup = drawer.draw(newVGroup);
        this.svg.appendChild(drawedVGroup);

        newVGroup.drawed = drawedVGroup;

        return this.addElement(newVGroup);
    }

    line(x1 = 10, y1 = 10, x2 = 100, y2 = 10) {
        let newLine = new Line(x1, y1, x2, y2);
        newLine.id = this.generateId();
        newLine.changerListener = new SVGChanger();

        let lookAndFeel = new LookAndFeel();
        let drawer = lookAndFeel.getDrawerFor(newLine);
        drawer.svgArea = this;
        var drawedLine = drawer.draw(newLine);
        this.svg.appendChild(drawedLine);

        newLine.drawed = drawedLine;

        return this.addElement(newLine);
    }

}

class SVGChanger {

    constructor() {
        if (!svgChanger) {
            svgChanger = this;
        }

        return svgChanger;
    }

    changePosition(element) {
        if (element instanceof Line) {
            element.drawed.setAttribute("x1", element.x1);
            element.drawed.setAttribute("y1", element.y1);
            element.drawed.setAttribute("x2", element.x2);
            element.drawed.setAttribute("y2", element.y2);
        } else if (element instanceof Circle) {
            element.drawed.setAttribute("cx", element.centerX);
            element.drawed.setAttribute("cy", element.centerY);
        } else {
            this.changeX(element);
            this.changeY(element);
        }
    }

    changeX(element) {
        if (element instanceof Circle) {
            element.drawed.setAttribute("cx", element.centerX);
        } else {
            element.drawed.setAttribute("x", element.x);
        }
    }

    changeY(element) {
        if (element instanceof Circle) {
            element.drawed.setAttribute("cy", element.centerY);
        } else {
            element.drawed.setAttribute("y", element.y);
        }
    }

    changeWidth(element) {
        if (element instanceof Line) {
            element.drawed.setAttribute("x2", element.x2);
        } else {
            element.drawed.setAttribute("width", element.width);
        }
    }

    changeHeight(element) {
        if (element instanceof Line) {
            element.drawed.setAttribute("y2", element.y2);
        } else {
            element.drawed.setAttribute("height", element.height);
        }
    }

    changeDimensions(element) {
        this.changeWidth(element);
        this.changeHeight(element);
    }

    changeRadius(element) {
        element.drawed.setAttribute("r", element.radius);
    }

    changeRadiusX(element) {
        element.drawed.setAttribute("rx", element.radiusX);
    }

    changeRadiusY(element) {
        element.drawed.setAttribute("ry", element.radiusY);
    }

    changeStylingAttributes(element, json) {
        Object.assign(element.drawed.style, json);
    }

    changeText(element) {
        element.drawed.textContent = element.text;
    }

}
