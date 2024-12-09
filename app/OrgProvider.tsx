"use client";

import { useEffect } from "react";
import { SignOutButton, useAuth, useOrganizationList } from "@clerk/nextjs";

type Props = {
    children: React.ReactNode;
}

export function OrgProvider({ children }: Props) {
    const { orgId } = useAuth();
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: true,
    });

    useEffect(() => {
        if (isLoaded && !orgId && userMemberships.data.length > 0) {
            setActive({
                organization: userMemberships.data[0].organization.id,
            });
        }
    }, [isLoaded, orgId, setActive, userMemberships.data]);

    if (!isLoaded || userMemberships.isLoading || userMemberships.isFetching) {
        return <div>Loading...</div>;
    }

    if (userMemberships.count === 0 || userMemberships.isError) {
        return (
            <div>
                <h1>Oops! You don't have access to any organizations.</h1>
                <p>
                    Please contact your organization administrator for access.
                </p>
                <SignOutButton />
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
}