import { useState } from "react"
import { files } from "@/app/Config/firebase"

function DataPost() {

    const [text, setText] = useState()
    const [imageFile, setimageFile] = useState()
    const [videoFile, setvideoFile] = useState()

  




    async function fileWork() {
        try {
            await files({ text, imageFile, videoFile }) // Yahan videoFile ka istemal karna hoga
        } catch (error) {
            console.log(error)
        }
    }
    return <div>
        <div>
           
            
        </div>
        <div className="postInput">
            <div className="profile">
                <img src="https://scontent.fkhi2-3.fna.fbcdn.net/v/t39.30808-1/438097604_2144508322556128_4751671215895345471_n.jpg?stp=c27.0.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHnmPobAOF7o7IJE-g-ayFSqYhq7_au_ZepiGrv9q79l5HvoTIK91dPNc8W6rUqzmp7BLu70iOV46dGzlcpoaGR&_nc_ohc=bXXb61S3bTMQ7kNvgH9uhYu&_nc_ht=scontent.fkhi2-3.fna&oh=00_AfBd6IcNcTraUqYl6DsKX92705y-Rzzlf_T2zKFBmGojbA&oe=6636D2BC" />

                <input className="inputTT" onChange={(e) => setText(e.target.value)} placeholder="Hey! What's on your mind?" />
                <h1 className="line"></h1>

                <label htmlFor="fileInput">

                    <img className="icon1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfz7BNHO7vW-LMCMwPIJaC3H_mYhYFoyiNBLuFLe8I2Lu14ypau91eL6PsJZAb9MlvVA&usqp=CAU" alt="Icon" />

                </label>
                <input
                    id="fileInput"
                    type="file"
                    onChange={(e) => setimageFile(e.target.files[0])}
                    style={{ display: 'none' }}
                />

                <label htmlFor="fileInput1">

                    <img className="icon2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZJFf7hUHfxOg2ReCVm6Z_BHlwGWqu1PpEWUc--6Qdw&s" alt="Icon" />

                </label>
                <input
                    id="fileInput1"
                    type="file"
                    onChange={(e) => setvideoFile(e.target.files[0])}
                    style={{ display: 'none' }}
                />
                <button className="hey-btn" onClick={fileWork}>POST</button>

            </div>
        </div>
    </div>
}

export default DataPost;