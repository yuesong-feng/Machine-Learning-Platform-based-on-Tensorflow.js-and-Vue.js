<template>
  <div>
    <bar></bar>
    <v-main class="lighten-3">
      <v-container fluid>
        <v-row>
          <v-col cols="1.5"></v-col>

          <v-col cols="3">
            <v-card class="mx-auto" max-width="344">
              <v-img src="../images/mnist.png" height="200px"></v-img>
              <v-card-title> MNIST手写数字数据集 </v-card-title>
              <v-card-subtitle> 利用神经网络识别手写数字 </v-card-subtitle>
              <v-card-actions>
                <router-link to="/mnist" class="text-decoration-none">
                  <v-btn color="orange lighten-2" text>
                    START
                  </v-btn></router-link
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="show_mnist = !show_mnist">
                  <v-icon>{{
                    show_mnist ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show_mnist">
                  <v-divider></v-divider>
                  <v-card-text>
                    You will build a TensorFlow.js model to recognize
                    handwritten digits with a convolutional neural network.
                    First, we'll train the classifier by having it "look" at
                    thousands of handwritten digit images and their labels. Then
                    we'll evaluate the classifier's accuracy using test data
                    that the model has never seen. This task is considered a
                    classification task as we are training the model to assign a
                    category (the digit that appears in the image) to the input
                    image. We will train the model by showing it many examples
                    of inputs along with the correct output. This is referred to
                    as supervised learning.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card class="mx-auto" max-width="344">
              <v-img src="../images/cars.png" height="200px"></v-img>
              <v-card-title> 汽车的数字数据集 </v-card-title>
              <v-card-subtitle> 将曲线拟合到二维数据 </v-card-subtitle>
              <v-card-actions>
                <router-link to="/cars" class="text-decoration-none">
                  <v-btn color="orange lighten-2" text>
                    START
                  </v-btn></router-link
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="show_car = !show_car">
                  <v-icon>{{
                    show_car ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show_car">
                  <v-divider></v-divider>

                  <v-card-text>
                    You will train a model to make predictions from numerical
                    data describing a set of cars. This exercise will
                    demonstrate steps common to training many different kinds of
                    models, but will use a small dataset and a simple (shallow)
                    model. The primary aim is to help you get familiar with the
                    basic terminology, concepts and syntax around training
                    models with TensorFlow.js and provide a stepping stone for
                    further exploration and learning. Because we are training a
                    model to predict continuous numbers, this task is sometimes
                    referred to as a regression task. We will train the model by
                    showing it many examples of inputs along with the correct
                    output. This is referred to as supervised learning.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card class="mx-auto" max-width="344">
              <v-img src="../images/mobilenet.jpg" height="200px"></v-img>
              <v-card-title> 迁移学习：图像分类 </v-card-title>
              <v-card-subtitle> 使用预训练模型进行图像分类 </v-card-subtitle>

              <v-card-actions>
                <router-link
                  to="/TransferLearning"
                  class="text-decoration-none"
                >
                  <v-btn color="orange lighten-2" text> START </v-btn>
                </router-link>

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="
                    show_image_classification = !show_image_classification
                  "
                >
                  <v-icon>{{
                    show_image_classification
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show_image_classification">
                  <v-divider></v-divider>

                  <v-card-text>
                    You will learn how to build a simple "teachable machine", a
                    custom image classifier that you will train on the fly in
                    the browser using TensorFlow.js, a powerful and flexible
                    machine learning library for Javascript. You will first load
                    and run a popular pre-trained model called MobileNet for
                    image classification in the browser. You will then use a
                    technique called "transfer learning", which bootstraps our
                    training with the pre-trained MobileNet model and customizes
                    it to train for your application.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="1.5"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import bar from "../layouts/bar.vue";
export default {
  data: () => ({
    show_mnist: false,
    show_car: false,
    show_image_classification: false,
  }),
  components: {
    bar,
  },
};
</script>

<style scoped></style>
