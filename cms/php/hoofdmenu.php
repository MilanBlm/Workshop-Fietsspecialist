<?php 
$page = $_SERVER['REQUEST_URI'];
$pagePath = parse_url($page, PHP_URL_PATH);
//print_r(basename($pagePath));

$pageIsset = isset($_GET['page']);
$pageIsNotset = !isset($_GET['page']);
?>
<ul id="hoofdmenu">
    <span id="title">CMS | <?php echo ucfirst($rowUser['username']); ?></span>
        <li><a <?php if ($pageIsNotset or $pageIsset == "dashboard") { echo "class=\"active\""; } ?> href="?page=dashboard"><i class="fa fa-home"></i><span class="menu-item">Dashboard</span></a></li>
    <?php if ($rowUser['niveau'] != "gebruiker") { // alleen admin kan deze items aanpassen ?>
        <li><a <?php if ($pageIsset == "webpaginas") { echo "class=\"active\""; } ?> href="?page=webpaginas"><i class="fa fa-globe"></i><span class="menu-item">webpagina`s</span></a></li>
        <li><a <?php if ($pageIsset== "producten") { echo "class=\"active\""; } ?> href="?page=producten"><i class="fa fa-shopping-basket"></i><span class="menu-item">producten</span></a></li>
        <li><a <?php if ($pageIsset== "reviews") { echo "class=\"active\""; } ?> href="?page=reviews"><i class="fa fa-search"></i><span class="menu-item">reviews</span></a></li>
    <?php } ?>
    <?php if ($rowUser['niveau'] == "gebruiker") { ?>
        <li><a <?php if ($pageIsset== "bestellingen") { echo "class=\"active\""; } ?> href="?page=bestellingen"><i class="fa fa-shopping-bag"></i><span class="menu-item">Mijn bestellingen</span></a></li>
    <?php } ?>
    <?php if ($rowUser['niveau'] == "admin" || $rowUser['niveau'] == "medewerker") { // alleen admin kan deze items aanpassen ?>
        <li><a <?php if ($pageIsset== "instellingen") { echo "class=\"active\""; } ?> href="?page=instellingen"><i class="fa fa-cog"></i><span class="menu-item">instellingen</span></a></li>
        <li><a <?php if ($pageIsset== "gebruikers") { echo "class=\"active\""; } ?> href="?page=gebruikers"><i class="fa fa-user"></i><span class="menu-item">gebruikers</span></a></li>
    <?php } ?>
    <li><a <?php if ($pageIsset== "reparaties") { echo "class=\"active\""; } ?> href="?page=reparaties"><i class="fa fa-wrench"></i><span class="menu-item">Reperaties</span></a></li>
    <li><a <?php if ($pageIsset== "nieuw_review") { echo "class=\"active\""; } ?> href="?page=nieuw_review"><i class="fa fa-star"></i><span class="menu-item">Reviews</span></a></li>
</ul>