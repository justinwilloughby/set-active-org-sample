import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { OrgProvider } from "./OrgProvider";

export default function Home() {
  return (
    <>
      <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <OrgProvider>
          <div>
            <h1>Welcome</h1>
            <UserButton />
            <OrganizationSwitcher />
          </div>
        </OrgProvider>
      </SignedIn>
    </>
    
  );
}
