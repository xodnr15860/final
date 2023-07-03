import CbButton from './CBcomponent';


const CBsteps =[   
    {
        id: 'main',
        message:'안녕하세요👋🙂 　　　　　　　　　　 GoodDay 챗봇입니다. 　　　　　　　　　　 방문해주셔서　　　　　　　　 감사합니다.👍　　　　　　　　　　　　 무엇을 도와드릴까요?',
        trigger: '1',
    },
    {
        id: "1",
        user: true,
        trigger: (value) =>{
            const stringValue = JSON.stringify(value); 
            if (stringValue.includes('로그인')|| stringValue.includes('접속')) {
                return "3";
            } else if (stringValue.includes('찾기')|| 
                        stringValue.includes('잃어')|| 
                        stringValue.includes('잊어')|| 
                        stringValue.includes('비번')|| 
                        stringValue.includes('아이디')|| 
                        stringValue.includes('비밀번호'))
                        {
                return "4";
            } else if (stringValue.includes('모임')|| 
                        stringValue.includes('오프라인')|| 
                        stringValue.includes('게시판')||
                        stringValue.includes('사람')||
                        stringValue.includes('번개'))
                        {
                 return "5";
            } else if (stringValue.includes('운동')|| 
                        stringValue.includes('쇼핑몰')|| 
                        stringValue.includes('용품')||
                        stringValue.includes('샵')||
                        stringValue.includes('사고'))
                        {
                return "6";
            } else if (stringValue.includes('목표')|| 
                        stringValue.toLowerCase().includes('to')||
                        stringValue.toLowerCase().includes('do')||
                        stringValue.toLowerCase().includes('list')|| 
                        stringValue.includes('리스트')){
                return "7";
            } else if (stringValue.includes('ㅅㅂ')||
                        stringValue.includes('시발')||
                        stringValue.includes('병신')||
                        stringValue.includes('ㅄ')||
                        stringValue.includes('새')||
                        stringValue.includes('놈')||
                        stringValue.includes('년')){
                return "8";
            }
            else {
                return "error";
            }
        },
    },
    {
        id: '2',
        message: '더 궁금한 게 있으신가요?',
        trigger: 'Q'
    },
    {
        id: 'Q',
        options: [
            { value:'있어요', label: '있어요', trigger: 'continue' }, 
            { value:'없어요', label: '없어요', trigger: 'end' }
        ]
    },
    {
        id: 'continue',
        message: '무엇을 도와드릴까요?',
        trigger: '1',
    },
    {
        id: 'end',
        message: '이용해 주셔서 감사해요. 챗봇을 종료할게요.',
        trigger:'finish',
    },
    {
        id: 'finish',
        component: <CbButton id="finish"/>,
        end:true,
    },
    {
        id: '3',
        message: '로그인 페이지로 안내 해드릴게요 버튼을 눌러 이동하실 수 있어요.',
        trigger: 'login',
    },
    {
        id: 'login',
        component: <CbButton id="3"/>,
        trigger: '2',
    },
    {
        id: '4',
        message: '아이디 또는 비밀번호를 분실 하셨다면 다음 버튼을 통해 찾으실 수 있어요.',
        trigger: 'find',
    },
    {
        id: 'find',
        component: <CbButton id="4"/>,
        trigger: '2',
    },
    {
        id: '5',
        message: '사람들을 만날 수 있는 모임 게시판으로 안내 해드릴게요',
        trigger: 'Membership',
    },
    {
        id: 'Membership',
        component: <CbButton id="5"/>,
        trigger: '2',
    },
    {
        id: '6',
        message: '운동용품 샵으로 안내 해드릴게요 버튼을 눌러 이동하실 수 있어요',
        trigger: 'shop',
    },
    {
        id: 'shop',
        component: <CbButton id="6"/>,
        trigger: '2',
    },
    {
        id: '7',
        message: '마이페이지로 안내 해드릴게요.',
        trigger: 'list',
    },
    {
        id: 'list',
        component: <CbButton id="7"/>,
        trigger: '2',
    },
    {
        id: '8',
        message: '나쁜 말 말고 좋은 말만 써주세요. 😢',
        trigger: '2',
    },
    {
        id: 'error',
        message: '죄송해요 😅 　　　　　　　　　　 제가 잘 모르는 부분예요. 다른 궁금한 게 있으시면 말씀해주세요!',
        trigger: '1',
    },
 ]


export default CBsteps;

