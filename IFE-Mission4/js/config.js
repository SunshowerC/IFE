/**
 * Created by MaxWell on 2016/5/8.
 */


var localStorage = [
    //调查问卷 research
    {
        researchID :  1,
        researchTitle : '关于XXX的调查问卷',
        deadline : '2016-3-24',
        state : '', // 1.正在进行  2.未发布  3.已经结束
        questionTeam : [
            //题目元素
            {
                //题目需要有一个便于渲染的类似顺序的属性，但是由于题目需要可以复用，解决方案:
                //1.用数组的下标表示渲染顺序，复用的题目可以只需要插入被复制的题目后面即可
                isMust : true,  //必填，布尔类型
                questType :         , //单选 多选 填空
                questOption :  [
                    '18岁以下',
                    '18-25',
                    '25-35',
                    '35-50',
                    '50岁以上'
                ],
                answerNum :[
                    3,
                    4,
                    5,
                    1,
                    2
                ],

            },
            {

            }
        ],

    },



];

