# memcached-operator

### A simple operator build with operator sdk along with integration test cases

<br/>

### About the controller

Create a memcache custom resource with size, it will create a deployment with memcache image and replicas mentioned in memcache custom resource's size.
Controller will also update the memcache's status with pod name under Node's field
