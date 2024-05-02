'use client'
import Link from "next/link";
import { auth, provider } from "../Config/firebase";
import { signInWithPopup, FacebookAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import DataPost from "../Reusable/dataPost/page";
import { getData } from "../Config/firebase";

import Silder from "../Reusable/Silder/page";
import Swal from 'sweetalert2'





function LoginPage() {

    const router = useRouter()

    const [user, setUser] = useState(null);
    const [profileImg, setprofileImg] = useState();
    const [data, setdata] = useState([])


    async function facebooklogin() {

        signInWithPopup(auth, provider).then((result) => {
            setUser(result.user);
            const kaam = result.user.providerData;

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
                .then((res) => res.blob())
                .then((blob) => {
                    setprofileImg(URL.createObjectURL(blob));
                })
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function loggout() {
        signOut(auth)
        setUser(null)
    }
    // get doc By post //



    useEffect(function () {
        getDATAA()
    }, [])

    async function getDATAA() {
        const ads = await getData()
        setdata(ads)
         
    }
    console.log(data)

    function work() {
        Swal.fire({
            title: 'This future is coming soon.',
            allowOutsideClick: () => {
                const popup = Swal.getPopup()
                setTimeout(() => {
                    popup.classList.add('animate__animated', 'animate__headShake')
                })
                setTimeout(() => {
                    popup.classList.remove('animate__animated', 'animate__headShake')
                }, 500)
                return false
            },
        })

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // Check if user's authentication method is FacebookAuthProvider
                if (user.providerData && user.providerData.length > 0 && user.providerData[0].providerId === "facebook.com") {
                    // Profile image update logic
                    const credential = FacebookAuthProvider.credentialFromResult(user);
                    if (credential) {
                        const accessToken = credential.accessToken;
                        fetch(`https://graph.facebook.com/${user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
                            .then((res) => res.blob())
                            .then((blob) => {
                                setprofileImg(URL.createObjectURL(blob));
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                } else {
                    setUser(null);
                    setprofileImg(null); // Clear profile image when user is logged out
                }
            } else {
                setUser(null);
                setprofileImg(null); // Clear profile image when user is logged out
            }
        });

        // Cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div>







            {user ? (

                <>
                    <div>
                        <div className="container">
                            <nav className="navbar">
                                <div className="logo">
                                    <img src='https://github.com/hafizhammad123/working-time/blob/main/OH.png?raw=true' alt="Logo" />
                                </div>

                                <div className="search">
                                    <input type="text" placeholder="Search..." />
                                </div>

                                {user ? (
                                    <div className="">
                                        <h1 className="color">Wellcome {user.displayName}


                                            <br />
                                            {user.email}

                                            <button className="BTN" onClick={loggout}>Log Out</button>

                                        </h1>
                                    </div>
                                ) : (
                                    <h1 className="color">Wellcome Web Graph Studio</h1>
                                )}

                                <div className="profile">

                                    <img src={profileImg} alt="Profile" />
                                </div>
                            </nav>

                        </div>
                        <Silder />
                        <DataPost />

                        {/* data render */}
                        <div className="post-containe">
                            {data.map(function (item, index) {
                                if (item.videourl) { // Check karein ke video URL mojood hai ya nahi
                                    return (
                                        <div class="post-card">
                                            <div class="user-profile">
                                                <img src='https://scontent.fkhi2-3.fna.fbcdn.net/v/t39.30808-1/438097604_2144508322556128_4751671215895345471_n.jpg?stp=c27.0.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHnmPobAOF7o7IJE-g-ayFSqYhq7_au_ZepiGrv9q79l5HvoTIK91dPNc8W6rUqzmp7BLu70iOV46dGzlcpoaGR&_nc_ohc=bXXb61S3bTMQ7kNvgEMyhRT&_nc_ht=scontent.fkhi2-3.fna&oh=00_AfA30boTbMgQS4LxHNBBYikbzkUx48KZIBMcl0xDmM3s6A&oe=6638243C' />
                                                <span class="username">Muhammad Hammad </span>
                                            </div>
                                            <div class="post-content">

                                                <p>{item.work}</p>

                                                <video controls>
                                                <source src={item.videourl} type="video/mp4" />
                                                </video>

                                            </div>
                                            <div class="post-actions">
                                                <button class="like-btn">Like</button>
                                                <button class="comment-btn">Comment</button>
                                                <button class="share-btn">Share</button>
                                            </div>
                                        </div>

                                    );
                                } else {
                                    // Agar video URL nahi hai, toh sirf text aur image dikhao
                                    return (
                                        <div class="post-card">
                                            <div class="user-profile">
                                                <img src='https://scontent.fkhi2-3.fna.fbcdn.net/v/t39.30808-1/438097604_2144508322556128_4751671215895345471_n.jpg?stp=c27.0.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHnmPobAOF7o7IJE-g-ayFSqYhq7_au_ZepiGrv9q79l5HvoTIK91dPNc8W6rUqzmp7BLu70iOV46dGzlcpoaGR&_nc_ohc=bXXb61S3bTMQ7kNvgEMyhRT&_nc_ht=scontent.fkhi2-3.fna&oh=00_AfA30boTbMgQS4LxHNBBYikbzkUx48KZIBMcl0xDmM3s6A&oe=6638243C' />
                                                <span class="username">Muhammad Hammad </span>
                                            </div>
                                            <div class="post-content">

                                                <p>{item.work}</p>



                                                <div className="post-media">
                                                    {item.imaurl && <img src={item.imaurl} alt="Post" />}
                                                </div>


                                            </div>
                                            <div class="post-actions">
                                                <button class="like-btn">Like</button>
                                                <button class="comment-btn">Comment</button>
                                                <button class="share-btn">Share</button>
                                            </div>
                                        </div>

                                    );
                                }
                            })}

                        </div>

                        <img onClick={work} className="ggg" src="https://github.com/hafizhammad123/working-time/blob/main/jjj.png?raw=true" />

                        <img onClick={work} className="gg1" src="https://github.com/hafizhammad123/working-time/blob/main/kimas.png?raw=true" />

                    </div>

                </>
            ) : (

                <div>
                    <div className="front">
                        <img className="logo1" src="https://github.com/hafizhammad123/working-time/blob/main/20266134_3D_Square_with_Facebook_Logo.png?raw=true" />
                        <button className="F-btn" onClick={facebooklogin}>facebook login</button>
                    </div>
                </div>
            )
            }



        </div>
    );
}
export default LoginPage;


