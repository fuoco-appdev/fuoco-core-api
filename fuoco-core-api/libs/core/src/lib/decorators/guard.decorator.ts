import {GuardExecuter} from "../guard-executer";
import * as HttpError from 'http-errors';

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const method = descriptor.value;
        const instance = new executer();
        descriptor.value = async function (...args) {
            if (await !instance.canExecuteAsync()) throw new HttpError.Forbidden('Not authorized!');
            
            // This part will run when Meteor.isClient == false
            method.apply(this, args);
        };
      }
}