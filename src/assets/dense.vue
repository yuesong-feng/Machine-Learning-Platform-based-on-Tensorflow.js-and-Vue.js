<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">dense</span>
        </v-card-title>
      </template>
      <span
        >Creates a dense (fully connected) layer. <br />This layer implements
        the operation: output = activation(dot(input, kernel) + bias)
        <br />activation is the element-wise activation function passed as the
        activation argument. <br />kernel is a weights matrix created by the
        layer. <br />bias is a bias vector created by the layer (only applicable
        if useBias is true). <br />Input shape:* <br />nD tf.Tensor with shape:
        (batchSize, ..., inputDim). <br />The most common situation would be a
        2D input with shape (batchSize, inputDim). <br />Output shape:* <br />nD
        tensor with shape: (batchSize, ..., units). <br />For instance, for a 2D
        input with shape (batchSize, inputDim), the output would have shape
        (batchSize, units). <br />Note: if the input to the layer has a rank
        greater than 2, then it is flattened prior to the initial dot product
        with the kernel.</span
      >
    </v-tooltip>
    <v-card-actions>
      <v-row no-gutters>
        <!--        units-->
        <v-col cols="3">
          <v-text-field label="units" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >units (number) <br /><br />Positive integer, dimensionality of
              the output space.</span
            >
          </v-tooltip>
        </v-col>
        <!-- activation  -->
        <v-col cols="3">
          <v-select
            v-model="activation"
            :items="activation_list"
            label="activation "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >activation ('elu'|'hardSigmoid'|'linear'|'relu'|'relu6'|
              'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh')
              <br /><br />Activation function of the layer. <br /><br />If you
              don't specify the activation, none is applied.</span
            >
          </v-tooltip>
        </v-col>
        <!-- useBias  -->
        <v-col cols="3">
          <v-select
            v-model="useBias"
            :items="useBias_list"
            label="useBias "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >useBias (boolean) <br /><br />Whether the layer uses a bias
              vector. Defaults to true.</span
            >
          </v-tooltip>
        </v-col>
        <!-- kernelInitializer  -->
        <v-col cols="3">
          <v-select
            v-model="kernelInitializer"
            :items="kernelInitializer_list"
            label="kernelInitializer "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >kernelInitializer
              ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'|
              'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'|
              'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|tf.initializers.Initializer)
              <br /><br />
              Initializer for the convolutional kernel weights matrix.</span
            >
          </v-tooltip>
        </v-col>
        <!-- biasInitializer  -->
        <v-col cols="3">
          <v-select
            v-model="biasInitializer"
            :items="biasInitializer_list"
            label="biasInitializer "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >biasInitializer
              ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'|
              'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'|
              'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|tf.initializers.Initializer)
              <br /><br />Initializer for the bias vector.</span
            >
          </v-tooltip>
        </v-col>
        <!--        inputDim-->
        <v-col cols="3">
          <v-text-field label="inputDim" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >inputDim (number) <br /><br />If specified, defines inputShape as
              [inputDim].</span
            >
          </v-tooltip>
        </v-col>
        <!-- kernelConstraint  -->
        <v-col cols="3">
          <v-select
            v-model="kernelConstraint"
            :items="kernelConstraint_list"
            label="kernelConstraint  "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >kernelConstraint
              ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint)
              <br /><br />Constraint for the convolutional kernel weights.</span
            >
          </v-tooltip>
        </v-col>
        <!-- biasConstraint  -->
        <v-col cols="3">
          <v-select
            v-model="biasConstraint"
            :items="biasConstraint_list"
            label="biasConstraint  "
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >biasConstraint
              ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint)
              <br /><br />Constraint for the bias vector.</span
            >
          </v-tooltip>
        </v-col>
        <!-- kernelRegularizer  -->
        <v-col cols="3">
          <v-text-field
            v-model="kernelRegularizer"
            label="kernelRegularizer"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >kernelRegularizer ('l1l2'|string|Regularizer)
              <br /><br />Regularizer function applied to the kernel weights
              matrix.</span
            >
          </v-tooltip>
        </v-col>
        <!-- biasRegularizer  -->
        <v-col cols="3">
          <v-text-field
            v-model="biasRegularizer"
            label="biasRegularizer"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >biasRegularizer ('l1l2'|string|Regularizer)
              <br /><br />Regularizer function applied to the bias vector.</span
            >
          </v-tooltip>
        </v-col>
        <!-- activityRegularizer  -->
        <v-col cols="3">
          <v-text-field
            v-model="activityRegularizer"
            label="activityRegularizer"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >activityRegularizer ('l1l2'|string|Regularizer)
              <br /><br />Regularizer function applied to the activation.</span
            >
          </v-tooltip>
        </v-col>
        <!-- inputShape  -->
        <v-col cols="3">
          <v-text-field
            v-model="inputShape"
            label="inputShape"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >inputShape ((null | number)[]) <br /><br />If defined, will be
              used to create an input layer to insert before this layer. If both
              inputShape and batchInputShape are defined, batchInputShape will
              be used. This argument is only applicable to input layers (the
              first layer of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- batchInputShape  -->
        <v-col cols="3">
          <v-text-field
            v-model="batchInputShape"
            label="batchInputShape"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >batchInputShape ((null | number)[]) <br /><br />If defined, will
              be used to create an input layer to insert before this layer. If
              both inputShape and batchInputShape are defined, batchInputShape
              will be used. This argument is only applicable to input layers
              (the first layer of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- batchSize  -->
        <v-col cols="3">
          <v-text-field
            v-model="batchSize"
            label="batchSize"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >batchSize (number) <br /><br />
              If inputShape is specified and batchInputShape is not specified,
              batchSize is used to construct the batchInputShape: [batchSize,
              ...inputShape]</span
            >
          </v-tooltip>
        </v-col>
        <!-- dtype  -->
        <v-col cols="3">
          <v-select
            v-model="dtype"
            :items="dtype_list"
            label="dtype"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >dtype ('float32'|'int32'|'bool'|'complex64'|'string')
              <br /><br />The data-type for this layer. Defaults to 'float32'.
              This argument is only applicable to input layers (the first layer
              of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- name  -->
        <v-col cols="3">
          <v-text-field
            v-model="name"
            label="name"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span>name (string) <br /><br />Name for this layer.</span>
          </v-tooltip>
        </v-col>
        <!-- trainable  -->
        <v-col cols="3">
          <v-select
            v-model="trainable"
            :items="trainable_list"
            label="trainable"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >trainable (boolean) <br /><br />Whether the weights of this layer
              are updatable by fit. Defaults to true.</span
            >
          </v-tooltip>
        </v-col>
        <!-- weights  -->
        <v-col cols="3">
          <v-text-field
            v-model="weights"
            label="weights"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >weights (tf.Tensor[]) <br /><br />Initial weight values of the
              layer.</span
            >
          </v-tooltip>
        </v-col>
        <!-- inputDType  -->
        <v-col cols="3">
          <v-select
            v-model="inputDType"
            :items="inputDType_list"
            label="inputDType"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
                >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
              >inputDType ('float32'|'int32'|'bool'|'complex64'|'string')
              <br /><br />Legacy support. Do not use for new code.</span
            >
          </v-tooltip>
        </v-col>

        <!--        remove-->
        <v-col cols="4">
          <v-btn
            color="error"
            @click="remove"
            v-if="this.index + 1 == this.totalLayers"
          >
            remove
          </v-btn>
          <v-btn
            color="error"
            @click="remove"
            disabled
            v-if="this.index + 1 != this.totalLayers"
          >
            remove
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
    },
    totalLayers: {
      type: Number,
    },
  },
  data: () => ({
    allData: {},
    units: "",
    activation: "",
    useBias: "",
    kernelInitializer: "",
    biasInitializer: "",
    inputDim: "",
    kernelConstraint: "",
    biasConstraint: "",
    kernelRegularizer: "",
    biasRegularizer: "",
    activityRegularizer: "",
    inputShape: "",
    batchInputShape: "",
    batchSize: "",
    dtype: "",
    name: "",
    trainable: "",
    weights: "",
    inputDType: "",
    activation_list: [
      "elu",
      "hardSigmoid",
      "linear",
      "relu",
      "relu6",
      "selu",
      "sigmoid",
      "softmax",
      "softplus",
      "softsign",
      "tanh",
    ],
    useBias_list: ["true", "false"],
    kernelInitializer_list: [
      "constant",
      "glorotNormal",
      "glorotUniform",
      "heNormal",
      "heUniform",
      "identity",
      "leCunNormal",
      "leCunUniform",
      "ones",
      "orthogonal",
      "randomNormal",
      "randomUniform",
      "truncatedNormal",
      "varianceScaling",
      "zeros",
    ],
    biasInitializer_list: [
      "constant",
      "glorotNormal",
      "glorotUniform",
      "heNormal",
      "heUniform",
      "identity",
      "leCunNormal",
      "leCunUniform",
      "ones",
      "orthogonal",
      "randomNormal",
      "randomUniform",
      "truncatedNormal",
      "varianceScaling",
      "zeros",
    ],
    kernelConstraint_list: ["maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
    biasConstraint_list: ["maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
    dtype_list: ["float32", "int32", "bool", "complex64", "string"],
    trainable_list: ["true", "false"],
    inputDType_list: ["float32", "int32", "bool", "complex64", "string"],
  }),
  methods: {
    remove() {
      this.$emit("remove", "");
    },
    sendData() {
      //send data to allData
      this.allData["units"] = this.units;
      this.allData["activation"] = this.activation;
      this.allData["useBias"] = this.useBias;
      this.allData["kernelInitializer"] = this.kernelInitializer;
      this.allData["biasInitializer"] = this.biasInitializer;
      this.allData["inputDim "] = this.inputDim ;
      this.allData["kernelConstraint"] = this.kernelConstraint;
      this.allData["biasConstraint"] = this.biasConstraint;
      this.allData["kernelRegularizer"] = this.kernelRegularizer;
      this.allData["biasRegularizer"] = this.biasRegularizer;
      this.allData["activityRegularizer"] = this.activityRegularizer;
      this.allData["inputShape"] = this.inputShape;
      this.allData["batchInputShape"] = this.batchInputShape;
      this.allData["batchSize"] = this.batchSize;
      this.allData["dtype"] = this.dtype;
      this.allData["name"] = this.name;
      this.allData["trainable"] = this.trainable;
      this.allData["weights"] = this.weights;
      this.allData["inputDType"] = this.inputDType;
    },
  },
  mounted() {},
};
</script>
