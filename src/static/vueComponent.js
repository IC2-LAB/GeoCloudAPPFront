/*eslint-disable*/
export default {
  // 时间范围值
  RangeDateConfig: `
		<div>
    <el-date-picker
      style="width: 45%;"
      v-model="datePickerDefault"
      @change="handstarttime"
      type="datetime"
      placeholder="选择开始时间"
      align="right"
      :picker-options="pickerOptions">
    </el-date-picker>
    <span>-</span>
    <el-date-picker
      style="width: 45%;"
      v-model="enddatePickerDefault"
      @change="handleendtime"
      type="datetime"
      placeholder="选择结束时间"
      align="right"
      :picker-options="endpickerOptions">
    </el-date-picker>
		</div>`,
  CustomCloudConfig: `
		<el-input
		  style="width:90%"
			:name="vname"
			v-model="vmodel"
			@change="handleLike"
			placeholder="请输入内容">
		</el-input>`,
  // 枚举值导入
  SingleEnumImp2: `
	<el-input
	  style="width:90%"
		:name="vname"
		v-model="vmodel"
		@change="handleLike"
		placeholder="请输入内容">
	</el-input>`,
  SingleEnumImp: `
  <el-checkbox-group :name="vname" v-model="checked" @change="handleBtn">
    <el-checkbox v-for="city in cities" :label="city" :key="city">
      {{city}}
    </el-checkbox>
  </el-checkbox-group>`,
  // 比例尺控件
  scaleControl: `
<div style="width: 100%;">
  <el-slider
      style="width: 61%;float: left;"
      v-model="tepvalue"
      range
      :step="1"
      :format-tooltip="timestepToolTip"
       @change="timestepLike"
      show-stops
      :disabled="checkedValue"
      :max="maxdata">
    </el-slider>
    <template>
      <el-checkbox ref="checkbox"  @change="alocked()" style="width:30%;top: 11px;float: right;" v-model="checkedValue" >全部</el-checkbox>
    </template>
</div>
    `,
  // 文本单一值
  SingleTextConfig: `
  <el-input :name="vname" v-model="vmodel" style="width:90%"
    @change="handleLike"
  placeholder="请输入内容"></el-input>`,
  // 整型单一值
  SingleIntConfig: `<el-slider style="width:90%" @change="handleSingleInt" :name="vname" v-model="SingleIntConfigVmodel"></el-slider>`,
  // 浮点单一值
  SingleFloatConfig: `
  <el-input style="width:90%" :name="vname" v-model="vmodel"
    @change="handleEqual"  placeholder="请输入内容"></el-input>`,
  // input下拉框 单选
  InputIntConfig: `
  <el-autocomplete
      style="width: 90%;"
      class="inline-input"
      v-model="vmodel"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      clearable="true"
      @select="handleSelect"
      @change = "getInputInt"
    ></el-autocomplete>`,
  // input下拉框 单选
  InputFloatConfig:`
  <el-select  @change = "getInputFloat"  style="width: 90%;" v-model="vmodel" multiple  filterable clearable allow-create  placeholder="请选择">
    <el-option
      v-for="item in dataInput"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>`
}
