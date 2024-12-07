const UserMailBody = () => {
  return (
    <div className="user-body">
      <p>Dear Customer,</p>
      <p>We regret to notify you that an unauthorized attempt was made to access your account. Our system discovered suspicious activity, and we acted right away to safeguard your personal data.</p>
      <p>Please change your login information by clicking the following link in order to safeguard your account:</p>
      <p>Please be aware that your account may be temporarily suspended if no action is taken within 24 hours. We urge you to take immediate action to prevent any inconvenience.</p>
      <p>We sincerely apologize for any inconvenience this may cause and thank you for your immediate attention to this matter.</p>
      <div className="mail-subcontent">
        <p>Yours faithfully,</p>
        <p>Account Security Team</p>
      </div>
    </div>
  );
};

export default UserMailBody;
