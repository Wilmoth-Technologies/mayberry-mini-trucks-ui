export default function GoogleReviews() {
    return (
        <div className="flex-row items-center justify-center">
            <div>
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-kei-footer bg-contain bg-no-repeat bg-center drop-shadow-lg" />
                <h3 className="text-xl">Mayberry Mini Trucks</h3>
                <p>5.0 * * * * *</p>
                <p>Based on 73 reviews</p>
            </div>
            {/* Create Comment Portion or create another Component to handle comments and display it here... */}
        </div>
    );
};