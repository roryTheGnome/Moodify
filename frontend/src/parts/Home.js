import { useTranslation } from "react-i18next";
import heroImage from "./assets/1.jpeg";


function Home() {
    const { t } = useTranslation();

    return (
        <section className="home">

            <img className="home-image" src={heroImage} alt="Moodify preview" />

            <div className="home-text">
                <h1>Moodify</h1>

                <p>
                    {t("Welcome to")} <strong>Moodify</strong>.
                </p>

                <p>
                    {t("Moodify is a single-page application that lets you create playlists based on your mood and collaborate with other users.")}
                </p>

                <p>
                    {t("You can group songs into moods, and the same song can appear in multiple moods, because music rarely fits just one feeling.")}
                </p>

                <p>
                    {t("Depending on your role (visitor, user, or admin), you’ll have different ways to explore, manage, and contribute to the platform.")}
                </p>

                <p>
                    <strong>{t("Explore your mood!")}</strong>
                </p>
            </div>
        </section>
    );
}

export default Home;
