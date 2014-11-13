<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>test DaoPersonne</title>
    </head>
    <body>
        <?php
        require_once("../includes/parametres.inc.php");
        require_once("../includes/fonctions.inc.php");

        $dao = new M_DaoStage();
        $dao->connecter();
        
        echo "<p>Test  </p>";
        
        
        var_dump();
        
        $dao->deconnecter();
        ?>
    </body>
</html>
