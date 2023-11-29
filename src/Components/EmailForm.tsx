import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_NAME } from "../GraphQL/queries";
import { Profiles, Profile } from "../DTO/DTO";

interface EmailFormProps {
  onEmailSubmit: (profileNames: string[]) => void;
  onEmailAddressEntered: (userEmail: string) => void;
}

function EmailForm({ onEmailSubmit, onEmailAddressEntered }: EmailFormProps) {
  const [userEmail, setUserEmail] = useState("");
  /* const { loading, error, data } = useQuery(GET_PROFILE_NAME, { */
  const { loading, error, data } = useQuery<Profiles>(GET_PROFILE_NAME, {
    variables: { userEmail },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (loading) {
      // Handle loading state appropriately, maybe ignore the submit or show a loading indicator
      return;
    }

    if (error) {
      // Handle error state, show a message or log the error
      console.error("Error fetching data or data is undefined:", error);
      return;
    }

    if (data === undefined) {
      // Handle error state, show a message or log the error
      console.error("Not ready");
      return;
    }

    const profileNames: string[] = data.profiles.map(
      (item: Profile) => item.profileName
    );

    onEmailSubmit(profileNames);
    onEmailAddressEntered(userEmail);
  };

  return (
    <div className="EmailForm">
      <h2>Email:</h2>
      <input
        type="text"
        value={userEmail}
        onChange={handleInputChange}
        placeholder="User email..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {loading && <p>Loading...</p>}´{error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default EmailForm;
