import { UIUtils } from "./ui-utils";
import { BindingEngine, DOM, TaskQueue } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
export var UIEvent;
(function (UIEvent) {
    function fireEvent(event, element, data) {
        let e = DOM.createCustomEvent(event, { bubbles: true, cancelable: true, detail: data });
        return element.dispatchEvent(e);
    }
    UIEvent.fireEvent = fireEvent;
    var __ea;
    var __ob;
    var __tq;
    function broadcast(event, data) {
        if (!__ea) {
            __ea = UIUtils.lazy(EventAggregator);
        }
        __ea.publish(event, data);
    }
    UIEvent.broadcast = broadcast;
    function subscribe(event, callback) {
        if (!__ea) {
            __ea = UIUtils.lazy(EventAggregator);
        }
        return __ea.subscribe(event, callback);
    }
    UIEvent.subscribe = subscribe;
    function observe(object, property, callback) {
        if (!__ob) {
            __ob = UIUtils.lazy(BindingEngine);
        }
        return __ob.propertyObserver(object, property).subscribe(callback);
    }
    UIEvent.observe = observe;
    function queueTask(fn) {
        if (!__tq) {
            __tq = UIUtils.lazy(TaskQueue);
        }
        __tq.queueTask(fn);
    }
    UIEvent.queueTask = queueTask;
})(UIEvent || (UIEvent = {}));
