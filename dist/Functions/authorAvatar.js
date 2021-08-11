function Main(d) {
    if (!d.data.author || !d.data.author.avatar)
        return "https://static.wikia.nocookie.net/logopedia/images/d/dd/Discord_2021_Alt1.svg/revision/latest/scale-to-width-down/250?cb=20210512181408";
    return d.data.author.displayAvatarURL({ size: 2048, dynamic: true });
}
export default Main;
//# sourceMappingURL=authorAvatar.js.map