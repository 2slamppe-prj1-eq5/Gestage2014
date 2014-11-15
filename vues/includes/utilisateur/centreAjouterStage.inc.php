<script language="JavaScript" type="text/javascript" src="../vues/javascript/fonctionsJavascript.inc.js"></script>
<script language="JavaScript" type="text/javascript" src="../bibliotheques/jquery.js"></script>
<script language="JavaScript" type="text/javascript" src=".../vues/javascript/ajax.inc.js"></script>


<!-- VARIABLES NECESSAIRES -->
<?php $unUtilisateur = $this->lireDonnee('utilisateur'); ?>

<!-- $this->message : à afficher sous le formulaire -->
<form method="post" action=".?controleur=utilisateur&action=validerAjoutStage">
    <h1>Ajouter un Stage</h1>
    <!-- Choix du type de compte pour afficher les différentes informations pour créer un compte spécifique -->
    <fieldset>
        
        <legend>Les informations g&eacute;n&eacute;rales</legend>
        
        
        <!-- Année Scolaire -->
        <label>Ann&eacutee scolaire :</label>
        <select id="annee" name="annee" OnChange="ajoutScol()">
            <option></option>
            <?php
                foreach ($this->lireDonnee('anneescol') as $AnneeScol) {
                    echo'<option value="' . $AnneeScol->getAnneeScol() . '">' . $AnneeScol->getAnneeScol() . '</option>';
                }
            ?>
            <option value="insertAnnee">Ajouter une Année ...</option>
        </select>
        <!-- div pour ajouté une année si elle n'est pas recensé -->
        <div id='ajoutAnnee'></div>
        
        
        <!-- Organisation -->
        <label>Organisation :</label>
        <select id="orga" name="orga" onChange="ajoutOrga()">
            <option></option>
            <?php foreach ($this->lireDonnee('organisation') as $Organisation) {
                echo'<option value="' . $Organisation->getIdOrganisation() . '">' . $Organisation->getNomOrganisation() . '</option>';
            }?>
            <option value="insertOrga">Ajouter une Organisation ...</option>
        </select>
        
        <!-- Ville ou se situera le stage -->
        <label>Ville :</label>
        <select onChange="ajoutVille()" name="ville" id="ville">
            <option></option>
            <?php foreach ($this->lireDonnee('organisation') as $Organisation) {
                echo'<option value="' . $Organisation->getVilleOrganisation() . '">' . $Organisation->getVilleOrganisation() . '</option>';
            }?>
            <option value="insertVille">Ajouter une Ville ...</option>
        </select>
        <!-- div pour ajouté une ville si elle n'est pas recensé -->
        <div id='ajoutVille'></div>
        
        <!-- Date de stage -->
        <label>Date de Début :</label>
        <input type="date" name="dateD">
        <label>Date de Fin :</label>
        <input type="date" name="dateF">
        <label>Date de Visite :</label>
        <input type="date" name="dateV">
    </fieldset>
    <fieldset>
        <legend>Personne</legend>
        <?php if($unUtilisateur->getRole()->getId()=="4"){ ?>
            <fieldset style="width: 397;">
                <legend>&Eacute;l&egrave;ve</legend>
                <label>Nom :</label>
                <input type="text" name="eleveNom" value="<?php echo $unUtilisateur->getNom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
                <label>Prénom :</label>
                <input type="text" name="elevePrenom" value="<?php echo $unUtilisateur->getPrenom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Professeur</legend>
                <label>Nom :</label>
                <input type="text" name="profNom">
                <label>Prénom :</label>
                <input type="text" name="profPrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Maître de stage</legend>
                <label>Nom :</label>
                <input type="text" name="stageNom">
                <label>Prénom :</label>
                <input type="text" name="stagePrenom">
            </fieldset>
        <?php } elseif($unUtilisateur->getRole()->getId()=="3"){ ?>
            <fieldset style="width: 397;">
                <legend>&Eacute;l&egrave;ve</legend>
                <label>Nom :</label>
                <input type="text" name="eleveNom">
                <label>Prénom :</label>
                <input type="text" name="elevePrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Professeur</legend>
                <label>Nom :</label>
                <input type="text" name="profNom" value="<?php echo $unUtilisateur->getNom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
                <label>Prénom :</label>
                <input type="text" name="profPrenom" value="<?php echo $unUtilisateur->getPrenom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Maître de stage</legend>
                <label>Nom :</label>
                <input type="text" name="stageNom">
                <label>Prénom :</label>
                <input type="text" name="stagePrenom">
            </fieldset>
        <?php } elseif($unUtilisateur->getRole()->getId()=="5"){ ?>
            <fieldset style="width: 397;">
                <legend>&Eacute;l&egrave;ve</legend>
                <label>Nom :</label>
                <input type="text" name="eleveNom">
                <label>Prénom :</label>
                <input type="text" name="elevePrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Professeur</legend>
                <label>Nom :</label>
                <input type="text" name="profNom">
                <label>Prénom :</label>
                <input type="text" name="profPrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Maître de stage</legend>
                <label>Nom :</label>
                <input type="text" name="stageNom" value="<?php echo $unUtilisateur->getNom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
                <label>Prénom :</label>
                <input type="text" name="stagePrenom" value="<?php echo $unUtilisateur->getPrenom();?>" readonly
                       style="color: rgb(84, 84, 84); background-color: rgb(235, 235, 228);">
            </fieldset>
        <?php } else { ?>
            <fieldset style="width: 397;">
                <legend>&Eacute;l&egrave;ve</legend>
                <label>Nom :</label>
                <input type="text" name="eleveNom">
                <label>Prénom :</label>
                <input type="text" name="elevePrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Professeur</legend>
                <label>Nom :</label>
                <input type="text" name="profNom">
                <label>Prénom :</label>
                <input type="text" name="profPrenom">
            </fieldset>
            <fieldset style="width: 397;">
                <legend>Maître de stage</legend>
                <label>Nom :</label>
                <input type="text" name="stageNom">
                <label>Prénom :</label>
                <input type="text" name="stagePrenom">
            </fieldset>
        <?php } ?>
    </fieldset>
    <fieldset>
        <legend>Supplément</legend>
        <label>Divers :</label>
        <input type="text" name="divers" id="divers"></input>
        <label>Bilan des travaux :</label>
        <input type="text" name="bilanTravaux" id="bilanTravaux"></input>
        <label>Ressources des Outils :</label>
        <input type="text" name="RessourcesOutils" id="RessourcesOutils"></input>
        <label>Commantaire :</label>
        <textarea style="margin: 0px; height: 19px; width: 172px;" type="text" name="Commantaire" id="Commantaire"></textarea>
        <label>Participation CCF :</label>
        <select type="select" name="ParticipationCCF" id="ParticipationCCF">
            <option></option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
        </select>
    </fieldset>
    <fieldset>
        <input type="submit" value="Creer" onclick="return valider()"></input><!-- OnClick éxécutera le JS qui testera tout les champ du formulaire. -->
        <input type="button" value="Retour" onclick="history.go(-1)">
    </fieldset>
</form>
<?php
// message de validation de création ou non 
if (isset($this->message)) {
    echo "<strong>" . $this->message . "</strong>";
}
?>

<script type='text/javascript'>
    function ajoutScol() {
        if(document.getElementById("annee").value === "insertAnnee"){
            b = document.getElementById("ajoutAnnee");
            b.innerHTML = '<input type="text" name="ajoutAnnee" style="width:144px; margin-left: 4px;">';
        } else{
            b = document.getElementById("ajoutAnnee");
            b.innerHTML = '';
        }
    }
    
    function ajoutOrga() {
        if(document.getElementById("orga").value === "insertOrga"){
            alert("Vous allez être redirigé vers la page de création d'un organisation");
            document.location.href=".?controleur=utilisateur&action=creerEntreprise" 
        }
    }
    
    function ajoutVille() {
        if(document.getElementById("ville").value === "insertVille"){
            b = document.getElementById("ajoutVille");
            b.innerHTML = '<input type="text" name="ajoutVille" style="width:144px; margin-left: 4px;">';
        } else{
            b = document.getElementById("ajoutVille");
            b.innerHTML = '';
        }
    }
</script>