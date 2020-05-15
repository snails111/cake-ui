import React from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Slider,InputNumber } from "antd";
import { BackwardOutlined, ForwardOutlined } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
      key: "range",
      param: "range",
      explain: "双滑块模式",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "defaultValue",
      param: "defaultValue",
      explain: "初始值",
      type: "number|array",
      defaultValue: "0 | [0,0](range为true时)",
    },
    {
      key: "disabled",
      param: "disabled",
      explain: "是否禁用",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "dots",
      param: "dots",
      explain: "是否只能拖拽到刻度上",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "marks",
      param: "marks",
      explain: "刻度标记",
      type: "object",
      defaultValue: "{}",
    },
    {
      key: "max",
      param: "max",
      explain: "最大值",
      type: "number",
      defaultValue: "100",
    },
    {
      key: "min",
      param: "min",
      explain: "最小值",
      type: "number",
      defaultValue: "0",
    },
    {
      key: "step",
      param: "step",
      explain: "步长(取值必须大于 0，并且可被 (max - min) 整除)",
      type: "number",
      defaultValue: "1",
    },
    {
      key: "tipFormatter",
      param: "tipFormatter",
      explain: "提示信息格式化",
      type: "function",
      defaultValue: "value => ReactNode|null",
    },
    {
      key: "value",
      param: "value",
      explain: "当前取值",
      type: "number|array",
      defaultValue: "",
    },
    {
      key: "vertical",
      param: "vertical",
      explain: "是否垂直",
      type: "Boolean",
      defaultValue: "false",
    },
    {
      key: "onChange",
      param: "onChange",
      explain: "值发生改变",
      type: "function",
      defaultValue: "(value) => void",
    },
    {
      key: "tooltipPlacement",
      param: "tooltipPlacement",
      explain: "Tooltip 展示位置",
      type: "string",
      defaultValue: "'left','center','right'",
    },
    {
      key: "tooltipVisible",
      param: "tooltipVisible",
      explain: "Tooltip 是否显示",
      type: "boolean",
      defaultValue: "",
    },
]

export default class SliderDemo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          inputValue1: 0,
          inputValue2: 0,
        };
    }
  
    onChange1 = value => {
      this.setState({inputValue1: value});
    };
    onChange2 = value => {
      if (isNaN(value)) {return;}
      this.setState({inputValue2: value});
    };
   
    render() {
        const marks = {
          0: '状态1',
          25: '状态2',
          50: '状态3',
          75: '状态4',
          100: '状态5',
        };
        

        return (
            <div>
                <h2>滑动输入条 示例</h2>

                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                    {/* 简单版 */}
                    <div style={{width:"48%"}}>
                        <Slider 
                          // min={0} //默认为0
                          // max={100} //默认为100
                          // step={1} //默认为1
                          defaultValue={30} 
                        />

                        <CodeStatus>{`
import { Slider } from "antd"

<Slider 
  // min={0} //默认为0
  // max={100} //默认为100
  // step={1} //默认为1
  defaultValue={30} 
/>
                        `}</CodeStatus>
                    </div>


                    {/* 步进式 */}
                    <div style={{width:"48%"}}>
                        <Slider 
                          range={false} //range为true是双滑块
                          step={25}
                          marks={marks} 
                          defaultValue={25}
                          tipFormatter={value=>{return `状态${(value/25)+1}`}} 
                          //tipFormatter格式化 Tooltip 的内容，若为null则隐藏 Tooltip
                        />

                        <CodeStatus>{`
import { Slider } from "antd"

const marks=${JSON.stringify(marks,null,2)}

<Slider 
  range={false} //range为true是双滑块
  step={25}
  marks={marks} 
  defaultValue={25}
  tipFormatter={value=>{return '状态'+(value/25)+1; }} 
  //tipFormatter格式化 Tooltip 的内容，若为null则隐藏 Tooltip
/>
                        `}</CodeStatus>
                    </div>


                    {/* 双滑块 */}
                    <div style={{width:"48%"}}>
                        <Slider range={true} defaultValue={[20,50]} />

                        <CodeStatus>{`
import { Slider } from "antd"

<Slider range={true} defaultValue={[20,50]} />
                        `}</CodeStatus>
                    </div>


                    {/* 带输入框 */}
                    <div style={{width:"48%"}}>
                          <div style={{display:"flex"}}>
                            <Slider
                              min={0}
                              max={20}
                              onChange={this.onChange1}
                              value={typeof this.state.inputValue1 === 'number' ? this.state.inputValue1 : 0}
                              style={{width:"70%"}}
                            />
                            <InputNumber
                              min={0}
                              max={20}
                              style={{ margin: '0 16px' }}
                              value={this.state.inputValue1}
                              onChange={this.onChange1}
                            />
                          </div>

                          <div style={{display:"flex"}}>
                            <Slider
                              min={0}
                              max={1}
                              step={0.01}
                              onChange={this.onChange2}
                              value={typeof this.state.inputValue2 === 'number' ? this.state.inputValue2 : 0}
                              style={{width:"70%"}}
                            />
                            <InputNumber
                              min={0}
                              max={1}
                              step={0.01}
                              style={{ margin: '0 16px' }}
                              value={this.state.inputValue2}
                              onChange={this.onChange2}
                            />
                          </div>
                        

                          <CodeStatus>{`
import { Slider,InputNumber } from "antd"

this.state = {
  inputValue1: 0,
  inputValue2: 0,
};

onChange1 = value => {
  this.setState({inputValue1: value});
};
onChange2 = value => {
  if (isNaN(value)) {return;}
  this.setState({inputValue2: value});
};

<div style={{display:"flex"}}>
  <Slider
    min={1}
    max={20}
    onChange={this.onChange}
    value={typeof this.state.inputValue1 === 'number' ? this.state.inputValue1 : 0}
    style={{width:"70%"}}
  />
  <InputNumber
    min={1}
    max={20}
    style={{ margin: '0 16px' }}
    value={this.state.inputValue1}
    onChange={this.onChange}
  />
</div>


<div style={{display:"flex"}}>
  <Slider
    min={0}
    max={1}
    step={0.01}
    onChange={this.onChange2}
    value={typeof this.state.inputValue2 === 'number' ? this.state.inputValue2 : 0}
    style={{width:"70%"}}
  />
  <InputNumber
    min={0}
    max={1}
    step={0.01}
    style={{ margin: '0 16px' }}
    value={this.state.inputValue2}
    onChange={this.onChange2}
  />
</div>
                          `}</CodeStatus>
                      </div>


                    {/* 带Icon */}
                    <div style={{width:"48%"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                          <BackwardOutlined style={{marginRight:8}}/>
                          <Slider 
                            defaultValue={25}
                            style={{width:"80%"}}
                          />
                          <ForwardOutlined style={{marginLeft:8}}/>
                        </div>

                        <CodeStatus>{`
import { Slider } from "antd"

<div style={{display:"flex",alignItems:"center"}}>
  <BackwardOutlined style={{marginRight:8}}/>
  <Slider 
    defaultValue={25}
    style={{width:"80%"}}
  />
  <ForwardOutlined style={{marginLeft:8}}/>
</div>
                        `}</CodeStatus>
                        </div>
                    </div>



                
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />

            </div>
        )
    }
}

