
import UseAuth from "../../../Hook/UseAuth";

const UserProfile = () => {

    const { user } = UseAuth();
    const { photoURL, displayName, email } = user;
    console.log(user);


    return (
        <div className="flex flex-col items-center justify-center p-6 shadow-2xl">
            {/* Profile Image */}
            <img
                src={photoURL || "https://i.pravatar.cc/150"}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            />

            {/* User Info */}
            <h2 className="mt-4 text-xl font-semibold">Name: {displayName}</h2>
            <p className="text-gray-500"> Email: {email}</p>
        </div>
    );
};

export default UserProfile;
