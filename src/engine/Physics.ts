/// <reference path="Collision/IPhysics.ts" />
module ex {

   /**
    * Possible collision resolution strategies
    *
    * The default is [[CollisionResolutionStrategy.Box]] which performs simple axis aligned arcade style physics.
    * 
    * More advanced rigid body physics are enabled by setting [[CollisionResolutionStrategy.RigidBody]] which allows for complicated
    * simulated physical interactions.
    */
   export enum CollisionResolutionStrategy {
      Box,
      RigidBody      
   }
   
   /**
    * Possible broadphase collision pair identification strategies
    * 
    * The default strategy is [[BroadphaseStrategy.DynamicAABBTree]] which uses a binary tree of axis-aligned bounding boxes to identify
    * potential collision pairs which is O(nlog(n)) faster. The other possible strategy is the [[BroadphaseStrategy.Naive]] strategy 
    * which loops over every object for every object in the scene to identify collision pairs which is O(n^2) slower.
    */
   export enum BroadphaseStrategy {
        Naive,
        DynamicAABBTree
   }

   /**
    * Possible numerical integrators for position and velocity
    */
   export enum Integrator {
       Euler
   }

   /**
    * The [[Physics]] object is the global configuration object for all Excalibur physics. 
    *
    * [[include:Physics.md]]
    */
   /* istanbul ignore next */
   export class Physics {
      /**
       * Global acceleration that is applied to all vanilla actors (it wont effect [[Label|labels]], [[UIActor|ui actors]], or 
       * [[Trigger|triggers]] in Excalibur that have an [[CollisionType.Active|active]] collision type).
       * 
       * 
       * This is a great way to globally simulate effects like gravity.
       */
      public static acc = new ex.Vector(0, 0);

      /**
       * Globally switches all Excalibur physics behavior on or off.
       */
      public static enabled = true;

      /**
       * Gets or sets the number of collision passes for Excalibur to perform on physics bodies. 
       *   
       * Reducing collision passes may cause things not to collide as expected in your game, but may increase performance.
       * 
       * More passes can improve the visual quality of collisions when many objects are on the screen. This can reduce jitter, improve the
       * collision resolution of fast move objects, or the stability of large numbers of objects stacked together.
       * 
       * Fewer passes will improve the performance of the game at the cost of collision quality, more passes will improve quality at the 
       * cost of performance. 
       * 
       * The default is set to 5 passes which is a good start.
       */
      public static collisionPasses = 5;

      /**
       * Gets or sets the broadphase pair identification strategy.
       * 
       * The default strategy is [[BroadphaseStrategy.DynamicAABBTree]] which uses a binary tree of axis-aligned bounding boxes to identify
       * potential collision pairs which is O(nlog(n)) faster. The other possible strategy is the [[BroadphaseStrategy.Naive]] strategy 
       * which loops over every object for every object in the scene to identify collision pairs which is O(n^2) slower.
       */
      public static broadphaseStrategy: BroadphaseStrategy = BroadphaseStrategy.DynamicAABBTree;
      
      /**
       * Globally switches the debug information for the broadphase strategy
       */
      public static broadphaseDebug: boolean = false;
      /**
       * Show the normals as a result of collision on the screen.
       */
      public static showCollisionNormals: boolean = false;
      /**
       * Show the position, velocity, and acceleration as graphical vectors.
       */
      public static showMotionVectors: boolean = false;
      /**
       * Show the axis-aligned bounding boxes of the collision bodies on the screen.
       */
      public static showBounds: boolean = false;
      /**
       * Show the bounding collision area shapes
       */
      public static showArea: boolean = false;
      /**
       * Show points of collision interpreted by excalibur as a result of collision.
       */
      public static showContacts: boolean = false;
      /**
       * Show the surface normals of the collision areas.
       */
      public static showNormals: boolean = false;
      /**
       * Gets or sets the global collision resolution strategy (narrowphase).
       * 
       * The default is [[CollisionResolutionStrategy.Box]] which performs simple axis aligned arcade style physics.
       * 
       * More advanced rigid body physics are enabled by setting [[CollisionResolutionStrategy.RigidBody]] which allows for complicated
       * simulated physical interactions.
       */
      public static collisionResolutionStrategy: CollisionResolutionStrategy = CollisionResolutionStrategy.Box;
      /**
       * The default mass to use if none is specified
       */
      public static defaultMass: number = 10;
      /**
       * Gets or sets the position and velocity positional integrator, currently only Euler is supported.
       */
      public static integrator: Integrator = Integrator.Euler;
      /**
       * Number of steps to use in integration. A higher number improves the positional accuracy over time. This can be useful to increase
       * if you have fast moving objects in your simulation or you have a large number of objects and need to increase stability.
       */
      public static integrationSteps = 1;
      /**
       * Gets or sets whether rotation is allowed in a RigidBody collision resolution 
       */
      public static allowRigidBodyRotation = true;

      /**
       * Configures Excalibur to use box physics. Box physics which performs simple axis aligned arcade style physics.
       */
      public static useBoxPhysics(): void {
         ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.Box;
      }

      /**
       * Configures Excalibur to use rigid body physics. Rigid body physics allows for complicated
       * simulated physical interactions.
       */
      public static useRigidBodyPhysics(): void {
         ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.RigidBody;
      }

      /**
       * Small value to help collision passes settle themselves after the narrowphase. 
       */
      public static collisionShift = .001;
   };
}