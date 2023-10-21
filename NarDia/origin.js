// 定义文本处理规则对象
let SpeechRuleJS = {

  // 规则名称
  name: "旁白/对话",
  
  // 规则ID
  id: "ttsrv.multi_voice",

  // 作者信息
  author: "TTS Server",

  // 版本号
  version: 4,

  // 标签说明
  tags: {
    narration: "旁白",
    dialogue: "对话"
  },

  // 处理包含引号的文本
  // 将文本分为旁白和对话
  handleText(text) {
    
    // 结果数组
    const list = []; 
    
    // 临时存储处理中的字符串
    let tmpStr = "";
    
    // 当前的结束标签,默认为旁白
    let endTag = "narration";
    
    // 按字符分割文本
    text.split("").forEach((char, index) => {
    
      // 累加字符到临时字符串
      tmpStr += char;
      
      // 如果遇到开引号,结束标签改为对话
      if (char === '“') {
        endTag = "dialogue";
        
        // 把临时字符串加入结果数组,标签为旁白
        list.push({text: tmpStr, tag: "narration"});
        
        // 清空临时字符串,从开引号后的字符开始存储
        tmpStr = "";
      } 
      
      // 如果遇到闭引号
      else if (char === '”') {
      
        // 结束标签改回旁白
        endTag = "narration";
        
        // 把临时字符串加入结果数组,标签为对话
        // 去掉末尾闭引号后再加入
        tmpStr = tmpStr.slice(0, -1) 
        list.push({text: tmpStr, tag: "dialogue"});
        
        // 清空临时字符串
        tmpStr = "";
      }
      
      // 如果是文本末尾
      else if (index === text.length - 1) {
      
        // 把临时字符串加入结果数组,标签为当前结束标签
        list.push({text: tmpStr, tag: endTag});
      }
    });
    
    // 返回结果数组
    return list;
  },

  // 根据标点符号分割文本
  splitText(text) {
  
    // 标点符号
    let separatorStr = "。??!!;;"
    
    // 结果数组
    let list = []
    
    // 临时存储字符串
    let tmpStr = ""
    
    // 按字符分割
    text.split("").forEach((char, index) => {
    
      // 累加字符到临时字符串
      tmpStr += char;
      
      // 如果遇到标点符号
      if (separatorStr.includes(char)) {
      
        // 把临时字符串作为一个元素加入结果数组
        list.push(tmpStr);
        
        // 清空临时字符串
        tmpStr = "";
      }
      
      // 如果是文本末尾
      else if (index === text.length - 1) {
      
        //把临时字符串加入结果数组
        list.push(tmpStr);
      }
    });
    
    // 过滤空元素后返回结果数组
    return list.filter(item => item.replace(/\[“”\]/g, '').trim().length > 0);
  }
};
