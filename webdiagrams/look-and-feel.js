/**
 * Created by Leandro Luque on 08/06/2017.
 */

/* JSHint configurations */
/* jshint esversion: 6 */
/* jshint -W097 */

'use strict';

let lookAndFeelSingleton = null;

class LookAndFeel {

    constructor() {
        if(!lookAndFeelSingleton) {
            lookAndFeelSingleton = this;

            this._lookAndFeelFactory = new DefaultLookAndFeelFactory();
        }

        return lookAndFeelSingleton;
    }

    get lookAndFeelFactory() {
        return this._lookAndFeelFactory;
    }

    set lookAndFeelFactory(value) {
        this._lookAndFeelFactory = value;
    }

    getDrawerFor(element) {
        return this._lookAndFeelFactory.getDrawerFor(element);
    }

}

class DefaultLookAndFeelFactory {

    getDrawerFor(element) {
        if(element instanceof Circle) {
            return new DefaultCircleDrawer();
        } else if(element instanceof Ellipse) {
            return new DefaultEllipseDrawer();
        } else if(element instanceof Rectangle) {
            return new DefaultRectangleDrawer();
        }
    }

}

class DefaultDrawer {

    constructor(svgArea) {
        this._svgArea = svgArea;
    }

    get svgArea() {
        return this._svgArea;
    }

    set svgArea(value) {
        this._svgArea = value;
    }

}

class DefaultCircleDrawer extends DefaultDrawer {

    draw(element) {
        let newCircle = document.createElementNS(super.svgArea.namespace, "circle");
        newCircle.setAttributeNS(null, "id", element.id);
        newCircle.setAttributeNS(null, "cx", element.centerX);
        newCircle.setAttributeNS(null, "cy", element.centerY);
        newCircle.setAttributeNS(null, "r", element.radius);
        newCircle.setAttributeNS(null, "style", element.stylingAttributes.toString());
        return newCircle;
    }

}

class DefaultEllipseDrawer extends DefaultDrawer {

    draw(element) {
        let newEllipse = document.createElementNS(super.svgArea.namespace, "ellipse");
        newEllipse.setAttributeNS(null, "id", element.id);
        newEllipse.setAttributeNS(null, "cx", element.centerX);
        newEllipse.setAttributeNS(null, "cy", element.centerY);
        newEllipse.setAttributeNS(null, "rx", element.radiusX);
        newEllipse.setAttributeNS(null, "ry", element.radiusY);
        newEllipse.setAttributeNS(null, "style", element.stylingAttributes.toString());
        return newEllipse;
    }

}

class DefaultRectangleDrawer extends DefaultDrawer {

    draw(element) {
        let newRectangle = document.createElementNS(super.svgArea.namespace, "rect");
        newRectangle.setAttributeNS(null, "id", element.id);
        newRectangle.setAttributeNS(null, "x", element.x);
        newRectangle.setAttributeNS(null, "y", element.y);
        newRectangle.setAttributeNS(null, "width", element.width);
        newRectangle.setAttributeNS(null, "height", element.height);
        newRectangle.setAttributeNS(null, "style", element.stylingAttributes.toString());
        return newRectangle;
    }

}