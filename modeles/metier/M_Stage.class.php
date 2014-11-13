<?php
/**
 * Description of M_Personne
 *
 * @author btssio
 */
class M_Stage {
    private $num; 
    private $annee;
    private $etudiant;
    private $prof;
    private $organisation;
    private $maitre;
    private $dateD;
    private $dateF;
    private $dateV;
    private $ville;
    private $divers;
    private $bilan;
    private $ressouce;
    private $commantaire;
    private $participationCCF;

    function __construct($num, $annee, $etudiant, $prof, $organisation, $maitre, $dateD, $dateF, $dateV, $ville, $divers, $bilan, $ressouce, $commantaire, $participationCCF) {
        $this->num = $num;
        $this->annee = $annee;
        $this->etudiant = $etudiant;
        $this->prof = $prof;
        $this->organisation = $organisation;
        $this->maitre = $maitre;
        $this->dateD = $dateD;
        $this->dateF = $dateF;
        $this->dateV = $dateV;
        $this->ville = $ville;
        $this->divers = $divers;
        $this->bilan = $bilan;
        $this->ressouce = $ressouce;
        $this->commantaire = $commantaire;
        $this->participationCCF = $participationCCF;
    }

    public function getNum() {
        return $this->num;
    }

    public function getAnneeScol() {
        return $this->annee;
    }

    public function getIdEtudiant() {
        return $this->etudiant;
    }

    public function getIdProf() {
        return $this->prof;
    }
    
    public function getIdOrganisation() {
        return $this->organisation;
    }
    
    public function getIdMaitreStage() {
        return $this->maitre;
    }

    public function getDateDebut() {
        return $this->dateD;
    }

    public function getDateFin() {
        return $this->dateF;
    }

    public function getDateVisiteStage() {
        return $this->dateV;
    }

    public function getVille() {
        return $this->ville;
    }

    public function getDivers() {
        return $this->divers;
    }

    public function getBilanTravaux() {
        return $this->bilan;
    }

    public function getRessouceOutils() {
        return $this->ressouce;
    }

    public function getCommantaire() {
        return $this->commantaire;
    }

    public function getParticipationCCF() {
        return $this->participationCCF;
    }

    public function setNum($num) {
        $this->num = $num;
    }

    public function setAnnee($annee) {
        $this->annee = $annee;
    }

    public function setEtudiant($etudiant) {
        $this->etudiant = $etudiant;
    }

    public function setProf($prof) {
        $this->prof = $prof;
    }

    public function setOrganisation($organisation) {
        $this->organisation = $organisation;
    }

    public function setMaitre($maitre) {
        $this->maitre = $maitre;
    }

    public function setDateD($dateD) {
        $this->dateD = $dateD;
    }

    public function setDateF($dateF) {
        $this->dateF = $dateF;
    }

    public function setDateV($dateV) {
        $this->dateV = $dateV;
    }

    public function setVille($ville) {
        $this->ville = $ville;
    }

    public function setDivers($divers) {
        $this->divers = $divers;
    }

    public function setBilan($bilan) {
        $this->bilan = $bilan;
    }

    public function setRessouce($ressouce) {
        $this->ressouce = $ressouce;
    }

    public function setCommantaire($commantaire) {
        $this->commantaire = $commantaire;
    }

    public function setParticipationCCF($participationCCF) {
        $this->participationCCF = $participationCCF;
    }


}
