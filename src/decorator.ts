import { ControllerOptions, applyDecorators, Controller } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { join } from 'path';
import 'reflect-metadata';

class ApiMetaDataProp {
  name: string;
  description: string;
  route?: string;
  upstream?: string;
}

export const MetaScope: {
  [key: string]: ApiMetaDataProp;
} = {};

export const ApiMetaData = (prop: ApiMetaDataProp) => {
  return (target: object, field: string, descriptor: PropertyDescriptor) => {
    MetaScope[field] = {
      ...prop,
      route: Reflect.getMetadata(PATH_METADATA, descriptor.value),
    };
  };
};

export const ControllerMetaData = () => {
  return (target: any) => {
    console.log('target', target, Reflect.getMetadata(PATH_METADATA, target));

    Object.keys(MetaScope).map((method) => {
      console.log('metascope', method);
      (MetaScope[method].route = join(
        Reflect.getMetadata(PATH_METADATA, target),
        MetaScope[method].route || '',
      )),
        (MetaScope[method].upstream = Reflect.getMetadata(
          PATH_METADATA,
          target,
        ));
    });

    console.log(MetaScope);
  };
};

export function CustomController(
  prefixOrOptions?: string | string[] | ControllerOptions,
): ClassDecorator {
  return applyDecorators(
    Controller(prefixOrOptions as any),
    ControllerMetaData(),
  );
}
