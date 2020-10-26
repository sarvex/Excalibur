import * as ex from '@excalibur';

class FakeEvent {}

describe('An EventEmitter', () => {
  it('should exist', () => {
    expect(ex.Emitter).toBeDefined();
  });

  it('should be constructed', () => {
    const emitter = new ex.Emitter();
    expect(emitter).not.toBeNull();
  });

  it('can listen to events "on" multiple times', () => {
    const emitter = new ex.Emitter<{ someevent: FakeEvent }>();
    const evt = new FakeEvent();
    const handler = jasmine.createSpy('handler');
    emitter.on('someevent', handler);

    emitter.emit('someevent', evt);
    emitter.emit('someevent', evt);
    emitter.emit('someevent', evt);

    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledWith(evt);
  });

  it('can listen to events "once" then unsubscribe', () => {
    const emitter = new ex.Emitter();
    const handler = jasmine.createSpy('handler');
    emitter.once('someotherevent', handler);

    emitter.emit('someotherevent');
    emitter.emit('someotherevent');
    emitter.emit('someotherevent');

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(undefined);
  });

  it('can be closed when using "on"', () => {
    const emitter = new ex.Emitter();
    const handler = jasmine.createSpy('handler');

    const sub = emitter.on('myevent', handler);

    emitter.emit('myevent');
    sub.close();
    emitter.emit('myevent');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('can be closed when using "once"', () => {
    const emitter = new ex.Emitter();
    const handler = jasmine.createSpy('handler');

    const sub = emitter.on('myevent', handler);
    sub.close();

    emitter.emit('myevent');
    emitter.emit('myevent');

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('can be switched off by name and handler', () => {
    const emitter = new ex.Emitter();
    const handler = jasmine.createSpy('handler');

    emitter.on('myevent2', handler);
    emitter.on('myevent1', handler);

    emitter.emit('myevent2');
    emitter.emit('myevent1');

    emitter.off('myevent2', handler);

    emitter.emit('myevent2');
    emitter.emit('myevent1');

    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('can be switched off by name and handler for "once"', () => {
    const emitter = new ex.Emitter();
    const handler = jasmine.createSpy('handler');

    emitter.on('onetime', handler);

    emitter.off('onetime', handler);

    emitter.emit('onetime', handler);

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('can pipe events into other emitters', () => {
    const sceneEmitter = new ex.Emitter();
    const actorEmitter = new ex.Emitter();
    // Pipe actor events into scene
    const pipeSub = actorEmitter.pipe(sceneEmitter);

    const handler = jasmine.createSpy('handler');

    sceneEmitter.on('myactorevent', handler);
    actorEmitter.emit('myactorevent');
    pipeSub.close();
    actorEmitter.emit('myactorevent');

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
