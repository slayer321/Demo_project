package controllers

import (
	"time"

	cachev1alpha1 "github.com/infracloudio/k8s-operator-with-tests/api/v1alpha1"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	appsv1 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
)

var _ = Describe("MemcachedController", func() {
	Context("testing memcache controller", func() {
		var memcached *cachev1alpha1.Memcached
		BeforeEach(func() {
			memcached = &cachev1alpha1.Memcached{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "test-memcache",
					Namespace: "default",
				},
				Spec: cachev1alpha1.MemcachedSpec{
					Size: 2,
				},
			}
		})
		// test case 1
		It("should create deployment", func() {
			Expect(k8sClient.Create(ctx, memcached)).To(BeNil())
			createdDeploy := &appsv1.Deployment{}
			deployKey := types.NamespacedName{Name: memcached.Name, Namespace: memcached.Namespace}
			Eventually(func() bool {
				err := k8sClient.Get(ctx, deployKey, createdDeploy)
				return err == nil
			}, time.Second*10, time.Millisecond*250).Should(BeTrue())
		})
		// test case 2
		It("verify replicas for deployment", func() {
			createdDeploy := &appsv1.Deployment{}
			deployKey := types.NamespacedName{Name: memcached.Name, Namespace: memcached.Namespace}
			Eventually(func() bool {
				err := k8sClient.Get(ctx, deployKey, createdDeploy)
				return err == nil
			}, time.Second*10, time.Millisecond*250).Should(BeTrue())
			Expect(createdDeploy.Spec.Replicas).To(Equal(&memcached.Spec.Size))
		})
		// test case 3
		It("should update deployment, once memcached size is changed", func() {
			Expect(k8sClient.Get(ctx, types.NamespacedName{Name: memcached.Name, Namespace: memcached.Namespace},
				memcached)).Should(Succeed())
			memcached.Spec.Size = 3
			Expect(k8sClient.Update(ctx, memcached)).Should(Succeed())
			Eventually(func() bool {
				k8sClient.Get(ctx,
					types.NamespacedName{Name: memcached.Name, Namespace: memcached.Namespace},
					memcached)
				return memcached.Spec.Size == 3
			}, time.Second*10, time.Millisecond*250).Should(BeTrue())

			createdDeploy := &appsv1.Deployment{}
			deployKey := types.NamespacedName{Name: memcached.Name, Namespace: memcached.Namespace}
			Eventually(func() bool {
				err := k8sClient.Get(ctx, deployKey, createdDeploy)
				return err == nil
			}, time.Second*10, time.Millisecond*250).Should(BeTrue())
			Expect(createdDeploy.Spec.Replicas).To(Equal(&memcached.Spec.Size))
		})
	})
})
