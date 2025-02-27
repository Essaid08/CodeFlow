import QuetionCard from "@/components/cards/QuetionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

export default function Home() {
    const questions = [
        {
            _id: '1', 
            title: 'Best practices for data fetching in a Next.js',
            tags: [{ _id: "1", name: 'next.js' }, { _id: "2", name: 'api' }],
            author: { _id: 'unknown', name: 'Jhone Doe', picture: '' },
            upvotes: 14870,
            views: 3254,
            answers: [],
            createdAt: new Date('2024-01-01T02:00:00.000Z'),
        },
        {
            _id: '2', 
            title: 'How to center a div',
            tags: [{ _id: "1", name: 'Html' }, { _id: "2", name: 'css' }],
            author: { _id: 'unknown', name: 'Jhone Doe', picture: '' },
            upvotes: 1100,
            views: 68904,
            answers: [],
            createdAt: new Date('2020-09-01T02:00:00.000Z'),
        },
    ]
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link href='/ask-questions' className="flex justify-end max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                        Ask a Question
                    </Button>
                </Link>
            </div>

            <div className=" mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                    route='/'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />

                <Filter
                    filters={HomePageFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px]'
                    containerClasses='hidden max-md:flex'
                />
            </div>

            <HomeFilters />

            <div className="mt-10 flex w-full flex-col gap-6">
                {questions.length > 0 ? questions.map((question) => (
                    <QuetionCard
                        key={question._id}
                        _id={question._id}
                        title={question.title}
                        tags={question.tags}
                        author={question.author}
                        upvotes={question.upvotes}
                        views={question.views}
                        answers={question.answers}
                        createdAt={question.createdAt}
                    />
                ))
                    : <NoResult
                        title="There's no question to show"
                        description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion.our query could be the next big thing others learn from. Get involved! 💡'
                        link='/ask-questions'
                        linkTitle='Ask a Question'
                    />}
            </div>
        </>
    )
}