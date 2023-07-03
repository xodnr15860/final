import DaumPostcode from "react-daum-postcode";
import './Post.css';

const Post = (props) => {

    const complete = (data) =>{
        let address = '';
        let ref = '';
        let zonecode = '';

        if (data.userSelectedType === 'R') {
            address = data.address;
            zonecode = data.zonecode;
            if (data.bname !== '') {
                ref += data.bname;
            }
            if (data.buildingName !== '') {
                ref += (ref !== '' ? `, ${data.buildingName}` : data.buildingName);
            }           
        }       
        if (data.userSelectedType === 'J') {
            address = data.jibunAddress;
            zonecode = data.zonecode;
            if (data.bname !== '') {
                ref += data.bname;
            }
            if (data.buildingName !== '') {
                ref += (ref !== '' ? `, ${data.buildingName}` : data.buildingName);
            }           
        }
        
        console.log(data);
        console.log(address);
        console.log(zonecode);
        console.log(ref);
        
        props.setcompany({
            ...props.company,
            address:address,
            ref:ref,
            zonecode:zonecode,
        })
    }
    
    return (
        <div >
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default Post;