import {GuardExecuter} from "../guard-executer";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const method = descriptor.value;
        const instance = new executer();
        descriptor.value = async function (...args) {
            if (await instance.canExecuteAsync()) return;
            
            // This part will run when Meteor.isClient == false
            method.apply(this, args);
        };
      }
}