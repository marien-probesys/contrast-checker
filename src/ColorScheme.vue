<script setup>

import { computed } from 'vue';
import convert from 'color-convert';

import { luminanceRatio } from './utils/color.js';

const props = defineProps(['name', 'colors']);
const rgbColors = computed(() => props.colors.map((hslColor) => {
  return convert.hsl.rgb(hslColor[0], hslColor[1], hslColor[2]);
}));

const color = (index) => {
  const rgb = rgbColors.value[index];
  const rgbContrast = (index === 10 || index === 11) ? rgbColors.value[0] : rgbColors.value[11];
  const color = `rgb(${rgbContrast[0]}, ${rgbContrast[1]}, ${rgbContrast[2]})`;
  return {
    color,
    backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
  };
}

const checkMainColors = computed(() => {
  const ratio1 = luminanceRatio(rgbColors.value[0], rgbColors.value[1]);
  const ok = ratio1 >= 1.08 && ratio1 <= 1.09;
  return ok ? '✅' : '❌ ' + ratio1;
});

const checkComponentColors = computed(() => {
  const ratio1 = luminanceRatio(rgbColors.value[1], rgbColors.value[2]);
  const ratio2 = luminanceRatio(rgbColors.value[2], rgbColors.value[3]);
  const ratio3 = luminanceRatio(rgbColors.value[3], rgbColors.value[4]);
  const ok = (
    ratio1 >= 1.1 && ratio1 <= 1.2 &&
    ratio2 >= 1.1 && ratio2 <= 1.2 &&
    ratio3 >= 1.1 && ratio3 <= 1.2
  );
  return ok ? '✅' : `❌ ${ratio1} ${ratio2} ${ratio3}`;
});

const checkBorderColors = computed(() => {
  const ratio1 = luminanceRatio(rgbColors.value[2], rgbColors.value[5]);
  const ratio2 = luminanceRatio(rgbColors.value[1], rgbColors.value[6]);
  const ratio3 = luminanceRatio(rgbColors.value[2], rgbColors.value[6]);
  const ratio4 = luminanceRatio(rgbColors.value[5], rgbColors.value[6]);
  const ratio5 = luminanceRatio(rgbColors.value[6], rgbColors.value[7]);
  const ok = (
    ratio1 >= 1.1 &&
    ratio2 >= 3 &&
    ratio3 >= 1.25 &&
    ratio4 >= 1.1 &&
    ratio5 >= 1.1 && ratio5 <= 1.2
  );
  return ok ? '✅' : `❌ ${ratio1} ${ratio2} ${ratio3} ${ratio4} ${ratio5}`;
});

const checkSolidColors = computed(() => {
  const ratio1 = luminanceRatio(rgbColors.value[6], rgbColors.value[8]);
  const ratio2 = luminanceRatio(rgbColors.value[7], rgbColors.value[9]);
  const ratio3 = luminanceRatio(rgbColors.value[8], rgbColors.value[9]);
  const ok = (
    ratio1 >= 1.1 &&
    ratio2 >= 1.1 &&
    ratio3 >= 1.1 && ratio3 <= 1.2
  );
  return ok ? '✅' : `❌ ${ratio1} ${ratio2} ${ratio3}`;
});

const checkTextColors = computed(() => {
  const ratio1 = luminanceRatio(rgbColors.value[4], rgbColors.value[10]);
  const ratio2 = luminanceRatio(rgbColors.value[4], rgbColors.value[11]);
  const ratio3 = luminanceRatio(rgbColors.value[9], rgbColors.value[11]);
  const ratio4 = luminanceRatio(rgbColors.value[10], rgbColors.value[11]);
  const ok = (
    ratio1 >= 4.5 &&
    ratio2 >= 7 &&
    ratio3 >= 4.5 &&
    ratio4 >= 2
  );
  return ok ? '✅' : `❌ ${ratio1} ${ratio2} ${ratio3} ${ratio4}`;
});

</script>

<template>
  <div class="flow">
    <div class="cols">
      <p class="blocks-label">Fonds principaux</p>

      <div class="block" :style="color(0)">1</div>
      <div class="block" :style="color(1)">2</div>
      <div class="block" />

      <div class="blocks-check">
        {{ checkMainColors }}
      </div>
    </div>

    <div class="cols">
      <p class="blocks-label">Fonds composants</p>

      <div class="block" :style="color(2)">3</div>
      <div class="block" :style="color(3)">4</div>
      <div class="block" :style="color(4)">5</div>

      <div class="blocks-check">
        {{ checkComponentColors }}
      </div>
    </div>

    <div class="cols">
      <p class="blocks-label">Bordures</p>

      <div class="block" :style="color(5)">6</div>
      <div class="block" :style="color(6)">7</div>
      <div class="block" :style="color(7)">8</div>

      <div class="blocks-check">
        {{ checkBorderColors }}
      </div>
    </div>

    <div class="cols">
      <p class="blocks-label">Fonds solides</p>

      <div class="block" :style="color(8)">9</div>
      <div class="block" :style="color(9)">10</div>
      <div class="block" />

      <div class="blocks-check">
        {{ checkSolidColors }}
      </div>
    </div>

    <div class="cols">
      <p class="blocks-label">Texte</p>

      <div class="block" :style="color(10)">11</div>
      <div class="block" :style="color(11)">12</div>
      <div class="block" />

      <div class="blocks-check">
        {{ checkTextColors }}
      </div>
    </div>
  </div>
</template>

<style scoped>

.blocks-label {
  width: 200px;

  flex-shrink: 0;
}

.block {
  display: flex;
  width: 50px;
  height: 50px;

  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.blocks-check {
  display: flex;
  height: 50px;

  flex: 1;
  align-items: center;
}

</style>
