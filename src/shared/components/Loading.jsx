import { useAuth0 } from '@auth0/auth0-react';

export default function Loading() {
    //TODO: Create Loading Spinner Component in the future..
    const { isLoading } = useAuth0();

    return (
        <div className={'text-lg text-red-600 h-96 w-96 ' + (isLoading ? '' : 'hidden')}>LOADING</div>
    );
};